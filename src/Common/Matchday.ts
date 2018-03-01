import { IMatchdayDataModel } from "./DataModel/MatchdayDataModel";
import { FoxfmIndexedDb } from "./IndexedDb/FoxfmIndexedDb";

export interface IMatchday {
    id(): Number;
    server(): Promise<String>;
    day(): Promise<Number>;
    season(): Number;
    date(): Date;
}

export class Matchday implements IMatchday {
    private source: FoxfmIndexedDb;
    private idValue: Number;

    constructor(db: FoxfmIndexedDb, id: Number) {
        this.source = db;
        this.idValue = id;
    }

    public id(): Number {
        return this.idValue;
    }
    public server(): Promise<String> {
        return this.source
            .matchdays
            .get(this.idValue)
            .then((result: IMatchdayDataModel) => result.serverValue);
    }
    public day(): Promise<Number> {
        return this.source
            .matchdays
            .get(this.idValue)
            .then((result: IMatchdayDataModel) => result.dayValue);
    }
    public season(): Number {
        throw new Error("Method not implemented.");
    }
    public date(): Date {
        throw new Error("Method not implemented.");
    }
}
