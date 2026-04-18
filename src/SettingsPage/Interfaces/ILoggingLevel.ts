import { ILogLevel } from "../../Common/Logger/LogLevel";

export default interface ILoggingLevel {
  module: string;
  selectedLogLevel: ILogLevel;
  onChange?: (logLevel: ILogLevel) => void;
}
