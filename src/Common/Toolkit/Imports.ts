import { IEasyLogger } from '../Logger/EasyLogger';
import { IImports } from './IImports';
import { IImport } from './IImport';
import { IUrl } from './Url';

export class Imports implements IImports {
  constructor(
    private currentUrl: IUrl,
    private imports: Array<IImport>,
  ) { }

  public import(log: IEasyLogger): Promise<void[]> {
    return Promise
      .all(this.imports.map(async (poImport: IImport) => {
        var currentUrl = this.currentUrl.url().toString();
        var targetUrl = poImport.targetUrl().url();
        var doImport = currentUrl.match(targetUrl) !== null;
        log.info(`called from: ${currentUrl} compared to ${targetUrl}: ${doImport}`);
        if (doImport) await poImport.import();
      }))
      .catch(reason => {
        throw `Could not execute all imports: ${reason}`;
      });
  }
}
