import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../models/board.model";
import {GreenhouseService} from "../../services/greenhouse.service";
import {TimeRangeModel} from "../../models/time-range.model";
import {KtdGridLayout, KtdGridLayoutItem, ktdTrackById} from "@katoid/angular-grid-layout";
import {SensorModel} from "../../models/sensor.model";
import {UtilService} from "../../util/util.service";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  private _board: BoardModel = BoardModel.createEmptyBoard();
  @Input() dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());
  @Input() sensorColumns: number = 3;

  layout: KtdGridLayout = []
  trackById = ktdTrackById;


  get board(): BoardModel {
    return this._board;
  }

  @Input()
  set board(value: BoardModel) {
    this._board = value;
    this._board.sensors = [];
    this.onBoardChange();
  }

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {

  }

  private generateLayout(): void {
    let i: number = 0;
    this.layout = [];
    for (let sensor of this._board.sensors) {
      const layoutItem: KtdGridLayoutItem = {
        id: sensor.id,
        x: this.getX(i),
        y: this.getY(i),
        w: 1,
        h: 1
      }
      i++;
      this.layout = [...this.layout, layoutItem];
      localStorage.setItem(this.getLayoutKey(), JSON.stringify(this.layout));
    }
  }

  private getLayout(): void {

    if (UtilService.isNullOrUndefined(localStorage.getItem(this.getLayoutKey()))) {
      this.generateLayout();
    } else {

      let savedLayout: KtdGridLayout = JSON.parse(localStorage.getItem(this.getLayoutKey())!);

      // Check if the layout saved in local storage contains all the sensors
      // First check if the number of sensors match
      // Then check if the sensor IDs match

      if (this._board.sensors.length != savedLayout.length) {
        this.generateLayout();
        return;
      }

      for (let sensor of this._board.sensors) {
        if (savedLayout.findIndex((gridItem) => gridItem.id === sensor.id) == -1) {
          this.generateLayout()
          return;
        }
      }

      this.layout = savedLayout;
    }

  }

  private getLayoutKey(): string {
    return this._board.id + '-layout';
  }

  private getX(index: number) {
    return index % this.sensorColumns;
  }

  private getY(index: number) {
    return Math.floor(index / this.sensorColumns);
  }

  findSensorById(id: string): SensorModel {
    return this._board.sensors.find(sensor => sensor.id == id)!;
  }

  onLayoutUpdate(layout: KtdGridLayout) {
    this.layout = layout;
    localStorage.setItem(this.getLayoutKey(), JSON.stringify(this.layout));
  }

  onBoardChange(): void {
    this.greenhouseService.getSensors(this._board).subscribe(
      sensors => {
        this._board.sensors = sensors;
        this.getLayout();
        console.log(this.layout);
      }
    );
  }

}
