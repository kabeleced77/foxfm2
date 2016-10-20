export interface IStadiumBlockName {
  name(): String;
  fromJson(jsonString: String): IStadiumBlockName;
}

export class StadiumBlockName1 implements IStadiumBlockName {
  private blockName: String;

  constructor() {
    this.blockName = "1";
  }

  public name(): String {
    return this.blockName;
  }
  public fromJson(jsonString: String): IStadiumBlockName {
    return new StadiumBlockName1();
  }
}

export class StadiumBlockName2 implements IStadiumBlockName {
  private blockName: String = "2";

  public name(): String {
    return this.blockName;
  }
  public fromJson(jsonString: String): IStadiumBlockName {
    return new StadiumBlockName2();
  }
}

export class StadiumBlockName3 implements IStadiumBlockName {
  private blockName: String = "3";

  public name(): String {
    return this.blockName;
  }
  public fromJson(jsonString: String): IStadiumBlockName {
    return new StadiumBlockName3();
  }
}

export class StadiumBlockName4 implements IStadiumBlockName {
  private blockName: String = "4";

  public name(): String {
    return this.blockName;
  }
  public fromJson(jsonString: String): IStadiumBlockName {
    return new StadiumBlockName4();
  }
}
