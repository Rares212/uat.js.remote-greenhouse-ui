import {Component, Input, OnInit} from '@angular/core';
import {SensorModel} from "../../models/sensor.model";
import {Color, DataItem, ScaleType, Series} from "@swimlane/ngx-charts";
import {GreenhouseService} from "../../services/greenhouse.service";
import {TimeRangeModel} from "../../models/time-range.model";
import {UtilService} from "../../util/util.service";
import {ValueRangeModel} from "../../models/value-range.model";
import {SensorType} from "../../enum/sensor-type.enum";

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {

  @Input() sensor: SensorModel = SensorModel.createEmptySensor()

  @Input() showGaugeData: boolean = true;
  @Input() showChartData: boolean = false;

  // Chart options
  @Input() chartView: [number, number] = [800, 400];
  @Input() legend: boolean = false;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() xAxisLabel: string = 'x';
  @Input() yAxisLabel: string = 'y';
  @Input() timeline: boolean = true;
  @Input() gradient: boolean = true;
  @Input() showGridLines: boolean = true;

  @Input()
  get dataTimeRange(): TimeRangeModel {
    return this._dataTimeRange;
  }

  set dataTimeRange(value: TimeRangeModel) {
    this._dataTimeRange = value;
    if (this.showChartData) {
      this.onTimeRangeChange();
    }
  }

  private _dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());

  valueRange: ValueRangeModel = ValueRangeModel.createValueRangeModelFromSensorType(SensorType.GENERIC);

  latestMeasurement: DataItem = {value: 0.0, name: new Date()}

  data: Series[] = [];

  colorScheme: Color = {
    name: 'Default',
    group: ScaleType.Ordinal,
    selectable: true,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private greenhouseService: GreenhouseService, private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.valueRange = ValueRangeModel.createValueRangeModelFromSensorType(this.sensor.sensorType);

    if (this.showGaugeData) {
      this.getLatestMeasurement();
    }
  }

  private buildChartData() {
    this.data = [
      {
        name: this.sensor.name,
        series: this.sensor.measurements
      }
    ];
  }

  onTimeRangeChange(): void {
    this.greenhouseService.getMeasurements(this.sensor, this._dataTimeRange.from, this._dataTimeRange.to).subscribe(
      measurements => {
        this.sensor.measurements = measurements;
        this.formatMeasurements();
        this.buildChartData();
        if (this.sensor.measurements.length == 0) {
          this.showChartData = false;
        }
      }
    );
  }

  private getLatestMeasurement(): void {
    this.greenhouseService.getLatestMeasurement(this.sensor).subscribe(
      measurement => {
        this.latestMeasurement = measurement;
      }
    )
  }

  private formatMeasurements(): void {
    for (let measurement of this.sensor.measurements) {
      measurement.name = this.utilService.formatReadableTime(measurement.name as Date);
    }
  }

}
