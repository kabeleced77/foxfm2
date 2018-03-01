import Dexie from "dexie";
import { IMatchdayDataModel } from "../DataModel/MatchdayDataModel";

export class FoxfmIndexedDb extends Dexie {
    public matchdays: Dexie.Table<IMatchdayDataModel, Number>;

    constructor() {
        super("foxfm");
        this.version(1).stores({
            matchdays: "++id, &[serverValue+seasonValue+dayValue], serverValue, seasonValue, dayValue"
        });
    }
}
