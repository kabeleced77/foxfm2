import { db } from "../Common/IndexedDb/FoxfmIndexedDb";
import { FoxfmBackground } from "./FoxfmBackground";

/****************************************************
 * Create background script application entry poing
 */
new FoxfmBackground(db)
  .main()
  .catch((e) => console.error("Background script", `error: ${e}`));
