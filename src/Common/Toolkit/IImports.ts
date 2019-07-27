import { IEasyLogger } from '../Logger/EasyLogger';

export interface IImports {
  import(log: IEasyLogger): Promise<void[]>;
}
