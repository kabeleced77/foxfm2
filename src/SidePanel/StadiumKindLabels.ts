import {
  IRessource,
  RessourceSidePanelStadiumKindCup,
  RessourceSidePanelStadiumKindFriendly,
  RessourceSidePanelStadiumKindLeague,
} from "../Common/Ressource";
import { GameKindCup, GameKindFriendly, GameKindLeague } from "../Common/GameKind";

export interface IStadiumKindLabels {
  /** localised name of the kind of game, e.g. "League" -> "Liga" */
  label(kind: string): string;
}

export class StadiumKindLabels implements IStadiumKindLabels {
  private readonly labels: { [kind: string]: IRessource } = {
    [new GameKindLeague().name().toString()]: new RessourceSidePanelStadiumKindLeague(),
    [new GameKindFriendly().name().toString()]: new RessourceSidePanelStadiumKindFriendly(),
    [new GameKindCup().name().toString()]: new RessourceSidePanelStadiumKindCup(),
  };

  public label(kind: string): string {
    const label = this.labels[kind];
    return label ? label.value().toString() : kind;
  }
}
