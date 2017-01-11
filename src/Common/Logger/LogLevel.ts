export interface ILogLevel {
  name(): String;
  level(): Number;
  fromJson(jsonString: String): ILogLevel;
}

export class LogLevel implements ILogLevel {
  private levelName: String;
  private levelNumber: Number;

  constructor(name: String, level: Number) {
    this.levelName = name;
    this.levelNumber = level;
  }

  public name(): String {
    return this.levelName;
  }
  public level(): Number {
    return this.levelNumber;
  }
  public fromJson(jsonString: String): ILogLevel {
    return new LogLevel(jsonString["levelName"], jsonString["levelNumber"]);
  }
}

export class LogLevelOff extends LogLevel { constructor() { super("Off", 0); } }
export class LogLevelError extends LogLevel { constructor() { super("Error", 1); } }
export class LogLevelInfo extends LogLevel { constructor() { super("Info", 2); } }
export class LogLevelWarn extends LogLevel { constructor() { super("Warn", 3); } }
export class LogLevelDebug extends LogLevel { constructor() { super("Debug", 4); } }
export class LogLevelAll extends LogLevel { constructor() { super("All", 99); } }

// export class LogLevelOff implements ILogLevel {
//   private levelName: String = "Off";

//   constructor() { }

//   public name(): String {
//     return this.levelName;
//   }
//   public fromJson(jsonString: String): ILogLevel {
//     return new LogLevel(jsonString["levelName"]);
//   }
// }

// export class LogLevelInfo implements ILogLevel {
//   private levelName: String = "Info";

//   constructor() { }

//   public name(): String {
//     return this.levelName;
//   }
//   public fromJson(jsonString: String): ILogLevel {
//     return new LogLevel(jsonString["levelName"]);
//   }
// }

// export class LogLevelWarn implements ILogLevel {
//   private levelName: String = "Warn";

//   constructor() { }

//   public name(): String {
//     return this.levelName;
//   }
//   public fromJson(jsonString: String): ILogLevel {
//     return new LogLevel(jsonString["levelName"]);
//   }
// }

// export class LogLevelDebug implements ILogLevel {
//   private levelName: String = "Debug";

//   constructor() { }

//   name(): String {
//     return this.levelName;
//   }
//   public fromJson(jsonString: String): ILogLevel {
//     return new LogLevel(jsonString["levelName"]);
//   }
// }

// export class LogLevelError implements ILogLevel {
//   private levelName: String = "Error";

//   constructor() { }

//   public name(): String {
//     return this.levelName;
//   }
//   public fromJson(jsonString: String): ILogLevel {
//     return new LogLevel(jsonString["levelName"]);
//   }
// }
