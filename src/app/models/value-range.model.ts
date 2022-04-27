import {SensorType} from "../enum/sensor-type.enum";

export class ValueRangeModel {
  from: number;
  to: number;

  constructor(from: number, to: number) {
    if (from < to) {
      this.from = from;
      this.to = to;
    } else {
      throw new SyntaxError('From cannot be after To in ValueRangeModel!');
    }
  }

  public static createValueRangeModelFromSensorType(type: SensorType) {
    switch (type) {
      case SensorType.AMBIENT_TEMP: {
        return new ValueRangeModel(0, 50);
      }
      case SensorType.WATER_TEMP: {
        return new ValueRangeModel(0, 50);
      }
      case SensorType.HUMIDITY: {
        return new ValueRangeModel(0, 100);
      }
      case SensorType.EC: {
        return new ValueRangeModel(0, 5000);
      }
      case SensorType.PH: {
        return new ValueRangeModel(0, 14);
      }
      case SensorType.LIGHT: {
        return new ValueRangeModel(0, 100000);
      }
      case SensorType.WATER_LEVEL: {
        return new ValueRangeModel(0, 70);
      }
      case SensorType.INTERNAL_WATER_FLOW: {
        return new ValueRangeModel(0, 1);
      }
      case SensorType.MAIN_WATER_VALVE: {
        return new ValueRangeModel(0, 1);
      }
      default: {
        return new ValueRangeModel(0, 100);
      }

    }
  }
}
