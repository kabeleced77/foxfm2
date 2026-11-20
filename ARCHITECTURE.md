# foxfm2 – Architektur

WebExtension (Firefox/Chrome, Vite + `vite-plugin-web-extension`, TypeScript, React für die Settings-Seite) für den Online Fussball Manager (OFM). Sie erweitert OFM-Seiten um zusätzliche Tabellenspalten (AWP, AWP-Diff, nächste Stärke, Transferpreise), Stadionpreis-Steuerung, Standard-Verkaufsdauer und importiert tägliche Spielertransfers.

## 1. Laufzeitkontexte

| Kontext | Einstieg | Aufgabe |
|---|---|---|
| Content Script | `src/ContentScript/foxfmContentScriptApp.ts` | Composition Root: baut den gesamten Objektgraph und führt Erweiterungen, Fokus und Imports aus |
| Background | `src/BackgroundPage/foxfmBackgroundScriptApp.ts` → `FoxfmBackground` | Kontextmenü „Settings“, Messaging-Server (`MessagingBackgroundScript`), Zugriff auf IndexedDB |
| Settings-Seite | `src/SettingsPage/settings.tsx` | React-UI (W3.CSS), schreibt Einstellungen in `browser.storage.local` |

Gemeinsamer Code liegt in `src/Common` (Domäne, Settings, Toolkit, Logger, IndexedDb, Messaging, Ressourcen). Content Script und Settings-Seite dürfen nicht direkt auf IndexedDB zugreifen (läuft nur im Background, siehe Abschnitt 6).

## 2. Code-Stil

- Fast alles ist **Interface `IXxx` + Klasse `Xxx`**, Abhängigkeiten per Konstruktor-Injektion.
- Objekt-Stil: kleine Klassen, Zugriff über Methoden (`value()`, `name()`), keine öffentlichen Felder (Ausnahme: Messaging-/DataModel-Klassen, die serialisiert werden und deshalb öffentliche Properties haben).
- Wrapper-Typen `Number`/`String` statt `number`/`string` sind üblich (Altlast, nicht angleichen ohne Grund).
- `fromJson(json)`: jede Klasse, die in Storage landet, kann sich aus dem gespeicherten JSON neu aufbauen. **Die JSON-Schlüssel sind die Namen der privaten Felder**, d.h. Feld umbenennen = Storage-Format ändern.
- Einrückung 2 Spaces, Prettier (`singleQuote`, `printWidth 100`, `trailingComma all`).

## 3. Settings (Persistenz in `browser.storage.local`)

Muster für jede Einstellung:

1. `SettingNameXxx implements ISettingName` – Storage-Key, Präfix `foxfm2.`
2. `XxxSettings` (+ `IXxxSettings extends ITypeInStorage`) – Wertobjekt mit `fromJson`
3. `new StorageLocal<IXxxSettings>(new SettingNameXxx(), defaultWert)` implementiert `ISetting<T>` (`value()`, `save()`, `update()`)

Wichtig:
- Ist noch nichts gespeichert, wird der **Default zurückgegeben und gespeichert**.
- Der Default wird **an jeder Verwendungsstelle neu angegeben** (Content Script *und* Settings-Seite) und muss dort identisch sein.
- `StorageLocalSync` + `Mutex` serialisieren Zugriffe (aktuell für die Logger-Module).
- Komplexere Settings kapseln das in eigener Klasse: `StrengthsLimitsSetting`, `StadiumBlocksSetting`, `StadiumOverallEntryPricesSetting` (enthalten Defaults und Änderungsmethoden).

## 4. Seiten erweitern (Content Script)

- `IExtendWebElement { targetUrl(): IUrl; extend(): void }`
- `ExtendWebPage` prüft pro Element `currentUrl.match(targetUrl)` und ruft `extend()`.
- `IFocusWebElement` / `FocusElementOnWebPage`: Fokus setzen (Liste derzeit leer).
- `IImport` / `Imports`: Importe, ebenfalls URL-gesteuert.
- Die Liste und die komplette Verdrahtung stehen in `foxfmContentScriptApp.ts`.

| Klasse | OFM-URL (`Common/Urls`) | Zweck |
|---|---|---|
| `TransferMarketProfessionalPlayerTable` | `transfer/transfermarkt.php` | Spalten AWP, Diff, nächste Stärke, Transferpreise, Stärke erweitern |
| `TransferMarketAmateurPlayerTable` | `transfer/amas.php` | AWP, Diff, nächste Stärke, Stärke erweitern |
| `TransferMarketOfferPlayerTable` | `transfer/angebote.php` | Diff, nächste Stärke, Stärke erweitern |
| `TransferMarketOfferDurationSelect` | `transfer/angebote.php` | Standard-Verkaufsdauer |
| `PlayerTransferMarketDurationSelect` | `player/spieler_anbieten_small.php?spielerid=…` | Standard-Verkaufsdauer |
| `TeamPlayerTable` | `team/players.php` | Diff, nächste Stärke, Stärke erweitern |
| `StadiumManagerUi` | `stadium/stadium.php` | Gesamt- und Block-Aufpreise |
| `MessagingImportTransfers` (Import) | `HeaderWebPageUrl` (`/game/`) | Import täglicher Transfers anstoßen |

### DOM-Zugriff

XPath-Kette, von innen nach außen:
`XPathString` → `XPathAllResults` → `XPathSingleResult` (genau 1 Treffer, sonst Fehler) → `XPathHtmlTableCell` → `HtmlTableColumnByXpath` → `HtmlTableColumnNumberValues` / `HtmlTableColumnStringValues` / `StrengthValues`.
Tabellen: `HtmlTable` (Operationen `addColumn`, `extendColumn`, `addNewCellToBodyRow`) über `HtmlTableByXPath` + `FirstElementInXPathNodeOrParents`. Neue DOM-Elemente: `HtmlElement` + `HtmlAttribute`.
**Alle XPaths sind hart kodiert** (`foxfmContentScriptApp.ts`, bei Stadion zusätzlich in `StadiumBlocksSetting` und `StadiumManagerUi`). Ändert OFM das Layout, sind sie die erste Fehlerquelle.

## 5. Domäne: Stärke / AWP

- `StrengthLimits(value, wage, awps)` – Untergrenze der AWPs für eine Stärke; `StrengthsLimits` – Liste, `strengthLimitsByAwp(awps)` liefert die tatsächliche Stärke. `StrengthLimitsNotFound` = Nullobjekt (-1).
- `StrengthsLimitsSetting` – Defaults (Stärke 1–27) + Persistenz. Bearbeitung/Import auf der Settings-Seite (`strength-awp-limits/`).
- `IAwp`: `Awp` (fester Wert), `AwpByEpTp` (`round(2·ep·tp/(ep+tp))`). `IAwpPoints`: `AwpPoints`, `AwpPointsByEpTp` (zwei Spalten), `AwpPointsBySplittedString` (Zelle `"ep/tp"`).
- `StrengthLevel(strengthsLimits, aktuelleStärke, awp)` → `actualStrengthValue`, `missingAwpsToNextStrengthValue`, `nextStrengthValue`. `StrengthLevels` zippt `IStrengthValues` mit `IAwpPoints` (gleiche Länge, sonst Fehler).
- `PlayerCategory(position, age, strength)` + `StrengthLevel` = `Player`; `Players`, `PlayerCategories` bilden Listen aus Tabellenspalten.

## 6. Messaging, Import und IndexedDB

```
Content Script ── MessagingContentScript.send ──► chrome.runtime.connect (Port "indexedDb")
                                                      │
Background: MessagingBackgroundScript.connect()  ◄────┘  switch (message.type.name)
        │
        ├─ ImportTransfers → ImportedPlayerTransfers → PlayerTransfersIDb / MatchdaysIDb / ImportedTransfersOfMatchdaysIDb
        └─ Abfragen (Durchschnittspreise, „schon importiert?“) → Antwort per port.postMessage
```

Nachrichtentypen (`name`): `/indexedDb/addMatchday`, `/indexedDb/addClub`, `/import/transfers`, `/transfers/imported`, `/indexedDb/transferprices/average`, `/indexedDb/transferprices/averages`.

**Neue Nachricht anlegen:** Typ-Klasse in `Common/Messaging/` (`IMessagingMessageTypeDataModel`), Inhalts-Klasse + Interface in `Common/DataModel/`, `case` in `MessagingBackgroundScript.connect()`, Client-Klasse im Content Script (Beispiele: `PlayerTransfersMessaging`, `ImportedTransfersOfMatchdaysMessaging`).

**Transferimport:** `MessagingImportTransfers` (Content Script) liest Saison/Spieltag aus dem OFM-Header, fragt per `MyNotification` den Nutzer, geht rückwärts Spieltag für Spieltag. Das Background lädt `transfer/spielerwechsel_export.php`, parst die zweite Tabelle und ermittelt Spalten über **lokalisierte Header-Texte** (`Ressource…ImportField…`), deshalb muss die Browsersprache zur OFM-Sprache passen.

**Preise in der Tabelle:** `PlayerTransfersMessaging.averages()` holt (und cached) alle Durchschnitte für Positionen × Alter × Stärke aus den Suchfiltern; Schlüssel ist `JSON.stringify(PlayerCategory)`.

**IndexedDB (Dexie, `FoxfmIndexedDb`, DB „foxfm“, Schema v1):** Tabellen `matchdays`, `clubs`, `gameServers`, `playerTransfers`, `importedTransfersOfMatchdays`. Pro Entität `XxxIDb` (hält nur die id, liest lazy) und Sammlung `XxxsIDb`; Datenmodelle in `Common/DataModel/IDataModelIDb*`. Schemaänderung = neue `this.version(n)`.

## 7. Settings-Seite (React)

`settings.tsx` baut `SettingsPageMenu` (Sidebar, Sektionen mit `id`/`label`/`content`). Jede Sektion ist eine `React.FC<{ logger }>` in eigenem Ordner:

- State pro Checkbox, `StorageLocal` in `useState(() => …)`, `useEffect` lädt, `handleSubmit` speichert.
- Rendering über `SettingsForm` (`header`, `intro`, `checkboxes` | `checkboxesWithSelect` | `children`, `handleSubmit`, `buttonId`).
- Bausteine: `InputCheckbox`, `Input`, `InputRadio`, `Select`, `CheckboxWithSelect`, `Button`, `Section`, `LoggingLevel`.

**Neue Sektion:** Komponente + Eintrag in `menuSections` + Menü-/Header-/Intro-Ressourcen (Abschnitt 8).

## 8. Texte (i18n)

- Quellen: `_locales/<Bereich>/<name>-de.json|-en.json`. `vite-plugins/mergeJsonPlugin` fasst alle Dateien mit gleichem Suffix zu `dist/_locales/<de|en>/messages.json` zusammen (Schlüssel global eindeutig, letzter gewinnt).
- Zugriff: `Common/Ressource.ts`, pro Text eine Klasse `RessourceXxx extends Ressource("key")` → `browser.i18n.getMessage`. Platzhalter: `value(substitution)` ↔ `$1`.
- **Neuer Text:** Key in *beide* Sprachdateien + Klasse in `Ressource.ts`.

## 9. Logging

`Logger` (Applikations-Level + Level je Modul, beides in Storage) und `EasyLogger(logger, RegisteredLoggingModule(name, level))`. Ein EasyLogger registriert sein Modul beim Erstellen. Level-Auswahl auf der Settings-Seite (`SettingsLogging`).

## 10. Checklisten

**Neue Einstellung für eine bestehende Erweiterung:**
Feld + Getter + `fromJson` in der Settings-Klasse → Default in Content Script *und* Settings-Seite anpassen → Checkbox in der Sektion → Ressource (de/en + Klasse) → Auswertung in der `…Table`-Klasse.

**Neue Spalte in einer OFM-Tabelle:**
Setting (s.o.) → in `extend()` der Table-Klasse `table.addColumn(new HtmlTableColumn(header, zellen, spaltenindex))` → Spaltenindex der nachfolgenden Spalten beachten (Zähler `columnNumber++`).

**Neue OFM-Seite erweitern:**
`IUrl`-Klasse in `Common/Urls`, Klasse `implements IExtendWebElement`, XPaths ermitteln, in `foxfmContentScriptApp.ts` in das `ExtendWebPage`-Array eintragen.

## 11. Build und Test

- `vite` (Config: `vite.config.ts`), Ziel per `TARGET=firefox|chrome` → Zip/XPI. Manifest: `src/manifest.json`, Name/Version aus `package.json`.
- Tests: Jest + ts-jest, `src/UnitTests/**` (Spiegel der Ordnerstruktur).
- Die `README.md` beschreibt noch gulp/jspm und ist veraltet.

## 12. Bekannte Altlasten

- **Tasking** (`Common/Tasking/*`, `TaskExecutionsIDb`, `TaskConfigurationsIDb` u.a.) ist stillgelegt (`TODO: remove task feature entirely` in `FoxfmBackground`) und referenziert IndexedDB-Tabellen, die im Schema nicht mehr existieren. Kann ignoriert werden.
- In `_locales/common-en.json` heißen die Keys `common_matchDay(s)`, in `Ressource.ts` `common_matchday(s)` (Groß-/Kleinschreibung): englischer Text wird so vermutlich nicht gefunden.
- Einige Texte (z.B. Fehlermeldung `ofm.strengthlevel.importerror`) sind keine Ressourcen.
- `MessagingBackgroundScript.send` und `MatchdayIDb.toString` sind nicht sauber implementiert.
