import ILoggingLevel from "../Interfaces/ILoggingLevel";
import InputRadio from "./InputRadio";
import { LogLevelError, LogLevels } from "../../Common/Logger/LogLevel";

export default function LoggingLevel(loggingLevel: ILoggingLevel) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const logLevelName = event.target.value;
    const logLevel =
      LogLevels.find((logLevel) => logLevel.name() === logLevelName) ??
      new LogLevelError();
    if (loggingLevel.onChange) {
      loggingLevel.onChange(logLevel);
    }
  };

  return (
    <div>
      <label>Select log level for {loggingLevel.module}: </label>
      {LogLevels.map((logLevel) => (
        <InputRadio
          key={logLevel.name()}
          label={logLevel.name()}
          id={`logLevel-${loggingLevel.module}-${logLevel.name()}`}
          name={`logLevel-${loggingLevel.module}`}
          value={logLevel.name()}
          checked={loggingLevel.selectedLogLevel.name() === logLevel.name()}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
