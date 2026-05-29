import { IStrengthLimits, StrengthLimits } from "./StrengthLimits";

export class StrengthLimitsNotFound
  extends StrengthLimits
  implements IStrengthLimits
{
  constructor() {
    super(-1, -1, -1);
  }
}
