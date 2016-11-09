/**
 * NumberHelper
 */
export class NumberHelper {
  public static coerce(limitMin: number, limitMax: number, value: number): number {
    var coercedValue = value;
    if (value > limitMax) coercedValue = limitMax;
    else if (value < limitMin) coercedValue = limitMin;
    return coercedValue;
  }
}
