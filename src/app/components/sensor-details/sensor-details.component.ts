import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SensorModel} from "../../models/sensor.model";
import {Color, DataItem, ScaleType, Series} from "@swimlane/ngx-charts";
import {GreenhouseService} from "../../services/greenhouse.service";
import {TimeRangeModel} from "../../models/time-range.model";
import {UtilService} from "../../util/util.service";
import {ValueRangeModel} from "../../models/value-range.model";
import {SensorType} from "../../enum/sensor-type.enum";
import {MeasurementUnit} from "../../enum/measurement-unit.enum";

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {

  MeasurementUnit = MeasurementUnit;
  SensorType = SensorType;

  @Input() sensor: SensorModel | undefined = undefined;

  loadingData: boolean = false;

  heightPx: number = 150;
  gaugeScaleFactor = 0.6;
  gaugeSegments = 10;

  indicatorView: [number, number] = [150, 150];
  chartView: [number, number] = [150, 150];

  // Layout item
  @Input() width: number = 1;

  // Chart options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;
  gradient: boolean = true;
  showGridLines: boolean = true;
  showReferenceLines: boolean = false;
  referenceLines: DataItem[] = [];

  @Input()
  get dataTimeRange(): TimeRangeModel {
    return this._dataTimeRange;
  }

  @Input() fractionDigits: number = 0;

  set dataTimeRange(value: TimeRangeModel) {
    this._dataTimeRange = value;
    this.onTimeRangeChange();
  }

  private _dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());

  valueRange: ValueRangeModel = ValueRangeModel.createValueRangeModelFromSensorType(SensorType.GENERIC);

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
    this.valueRange = ValueRangeModel.createValueRangeModelFromSensorType(this.sensor!.sensorType);
    this.onTimeRangeChange();
    this.buildColorScheme();
    window.dispatchEvent(new Event('resize'));
  }

  private buildColorScheme(): void {
    let mainColor: string;
    let secondaryColor: string = '#818181';

    switch (this.sensor!.sensorType) {
      case SensorType.PH: {
        mainColor = '#35b814';
        break;
      }
      case SensorType.EC: {
        mainColor = '#14b897';
        break;
      }
      case SensorType.WATER_LEVEL: {
        mainColor = '#14b845';
        break;
      }
      case SensorType.LIGHT: {
        mainColor = '#1487b8';
        break;
      }
      case SensorType.AMBIENT_TEMP:
      case SensorType.WATER_TEMP: {
        mainColor = '#b81487';
        break;
      }
      case SensorType.HUMIDITY: {
        mainColor = '#4514b8';
        break;
      }
      default: {
        mainColor = '#14b845';
        break;
      }
    }

    this.colorScheme = {
      name: 'Chart color scheme',
      group: ScaleType.Linear,
      domain: [mainColor, secondaryColor],
      selectable: true
    }

  }

  private buildChartData() {
    this.data = [
      {
        name: this.sensor!.name,
        series: this.sensor!.measurements
      }
    ];
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.heightPx = event.target.innerWidth / 12 + 150;
    this.gaugeSegments = Math.round(event.target.innerWidth / 400 + 4)
  }

  onTimeRangeChange(): void {
    this.loadingData = true;
    this.greenhouseService.getMeasurements(this.sensor!, this._dataTimeRange.from, this._dataTimeRange.to).subscribe(
      measurements => {
        this.sensor!.measurements = measurements;
        this.buildChartData();
        this.formatMeasurements();
      },
      () => {},
    () => {this.loadingData = false;}
    );
  }

  private formatMeasurements(): void {
    for (let measurement of this.sensor!.measurements) {
      measurement.name = new Date(measurement.name as number);
    }

    this.sensor!.latestMeasurement.name = new Date(this.sensor!.latestMeasurement.name);
  }

  formatValue(value: any): string {
    return value.toFixed(this.fractionDigits);
  }

  formatBool(value: any): string {
    return value !== 0.0 ? 'On' : 'Off';
  }
}
