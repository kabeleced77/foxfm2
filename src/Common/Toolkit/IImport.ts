import { IUrl } from "./Url";

export interface IImport {
  import(): Promise<void>;
  targetUrl(): IUrl;
}
