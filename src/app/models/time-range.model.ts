import {UtilService} from "../util/util.service";

export class TimeRangeModel {
  from: Date;
  to: Date;

  constructor(from: Date, to: Date) {
    if (from < to) {
      this.from = from;
      this.to = to;
    } else {
      throw new SyntaxError('From cannot be after To in TimeRangeModel!');
    }
  }

  public static createFullTimeRange(): TimeRangeModel {
    return new TimeRangeModel(UtilService.MIN_DATE, UtilService.MAX_DATE)
  }

  public static createDailyTimeRange(date: Date): TimeRangeModel {
    return new TimeRangeModel(UtilService.getBegginingOfDay(date), UtilService.getEndOfDay(date));
  }
}
