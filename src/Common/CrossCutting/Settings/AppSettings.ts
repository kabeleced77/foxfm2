export class AppSettings {
	public stadium: StadiumSettings;

	constructor() {
		this.stadium = new StadiumSettings();
	}
}

class StadiumSettings {
	public addOverallPrices: boolean = true;
	public active: boolean = true;
	public overallLeauge: number = 0;
	public overallCup: number = 0;
	public overallFriendly: number = 0;

	public leaugeNorth: number = 0;
	public leaugeSouth: number = 0;
}
