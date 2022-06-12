import {SensorType} from "../enum/sensor-type.enum";
import {DataItem} from "@swimlane/ngx-charts";
import {MeasurementUnit} from "../enum/measurement-unit.enum";

export class SensorModel {
  id: string;
  name: string;
  sensorType: SensorType;
  measurementUnit: MeasurementUnit;
  latestMeasurement: DataItem;
  measurements: DataItem[];
  referenceLines: DataItem[];


  constructor(id: string, name: string, sensorType: SensorType, measurementUnit: MeasurementUnit, latestMeasurement: DataItem, measurements: DataItem[], referenceLines: DataItem[]) {
    this.id = id;
    this.name = name;
    this.sensorType = sensorType;
    this.measurementUnit = measurementUnit;
    this.latestMeasurement = latestMeasurement;
    this.measurements = measurements;
    this.referenceLines = referenceLines;
  }

  public static createEmptySensor(): SensorModel {
    return new SensorModel('', '', SensorType.GENERIC, MeasurementUnit.PERCENT, {value: 0, name: new Date()}, [], []);
  }
}
