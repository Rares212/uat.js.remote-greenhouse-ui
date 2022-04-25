import {Component, Input, OnInit} from '@angular/core';
import {SensorModel} from "../../models/sensor.model";
import {Color, ScaleType, Series} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {

  @Input() sensor: SensorModel = SensorModel.createEmptySensor()

  // Chart options
  @Input() view: [number, number] = [700, 300];
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

  data: Series[] = [];

  colorScheme: Color = {
    name: 'Default',
    group: ScaleType.Ordinal,
    selectable: true,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  ngOnInit(): void {
    this.buildData();
  }

  buildData() {
    this.data = [
      {
        name: this.sensor.name,
        series: this.sensor.measurements
      }
    ];
  }

  onSelect(data: any): void {
  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }

}
