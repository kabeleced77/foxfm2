import { IGameServer } from "./IGameServer";
import { IMatchday } from "./IMatchday";
import { IValue } from "./Toolkit/IValue";

export class MatchdayConst implements IMatchday {
  constructor(
    private readonly moGameServer: IGameServer,
    private readonly miDay: IValue<Number>,
    private readonly miSeason: IValue<Number>,
    private readonly moDate: Date,
  ) { }

  public async gameServer(): Promise<IGameServer> {
    return this.moGameServer;
  }
  public async day(): Promise<Number> {
    return this.miDay.value();
  }
  public async season(): Promise<Number> {
    return this.miSeason.value();
  }
  public async date(): Promise<Date> {
    return this.moDate;
  }
  public async toString(): Promise<String> {
    return new String(`Matchday['${await this.moGameServer.uri()}':${this.miSeason.value()}-${this.miDay.value()}]`);
  }
}
