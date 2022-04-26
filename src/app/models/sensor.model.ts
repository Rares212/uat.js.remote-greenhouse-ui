import {SensorType} from "../enum/sensor-type.enum";
import {DataItem} from "@swimlane/ngx-charts";
import {UtilService} from "../util/util.service";

export class SensorModel {
  id: string;
  name: string;
  sensorType: SensorType;
  measurementUnit: string;
  measurements: DataItem[];

  constructor(id: string, name: string, sensorType: SensorType, measurementUnit: string, measurements: DataItem[]) {
    this.id = id;
    this.name = name;
    this.sensorType = sensorType;
    this.measurementUnit = measurementUnit;
    this.measurements = measurements;
  }

  public static createEmptySensor(): SensorModel {
    return new SensorModel('', '', SensorType.GENERIC, '', []);
  }
}
