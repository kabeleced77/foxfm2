export interface IGameKind {
  name(): String;
  fromJson(jsonString: String): IGameKind
}

export class GameKind implements IGameKind {
  private kindName: String;

  constructor(name: String) {
    this.kindName = name;
  }

  public name(): String {
    return this.kindName;
  }
  public fromJson(jsonString: String): IGameKind {
    return new GameKind(
      jsonString["kindName"]
    );
  }
}

export class GameKindLeague implements IGameKind {
  private kindName: String;

  constructor() {
    this.kindName = "league";
  }

  public name(): String {
    return this.kindName;
  }
  public fromJson(jsonString: String): IGameKind {
    return new GameKindLeague();
  }
}

export class GameKindFriendly implements IGameKind {
  private kindName: String;

  constructor() {
    this.kindName = "friendly";
  }

  public name(): String {
    return this.kindName;
  }
  public fromJson(jsonString: String): IGameKind {
    return new GameKindFriendly();
  }
}

export class GameKindCup implements IGameKind {
  private kindName: String;

  constructor() {
    this.kindName = "cup";
  }

  public name(): String {
    return this.kindName;
  }
  public fromJson(jsonString: String): IGameKind {
    return new GameKindCup();
  }
}
