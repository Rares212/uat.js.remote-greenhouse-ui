import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {BoardModel} from "../../models/board.model";
import {GreenhouseService} from "../../services/greenhouse.service";
import {TimeRangeModel} from "../../models/time-range.model";
import {KtdGridComponent, KtdGridLayout, KtdGridLayoutItem, ktdTrackById} from "@katoid/angular-grid-layout";
import {SensorModel} from "../../models/sensor.model";
import {UtilService} from "../../util/util.service";
import {debounceTime, filter, fromEvent, merge, Subscription} from "rxjs";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  private _board: BoardModel | undefined = undefined;
  @Input() dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());
  sensorColumns: number = 3;

  loadingSensors: boolean = false;

  rowHeight: number = 300;

  @ViewChild(KtdGridComponent, {static: true}) grid: KtdGridComponent | undefined;
  layout: KtdGridLayout = []
  trackById = ktdTrackById;

  resizeSubscription: Subscription | undefined;
  autoResize: boolean = true;

  get board(): BoardModel | undefined {
    return this._board;
  }

  @Input()
  set board(value: BoardModel | undefined) {
    if (!UtilService.isNullOrUndefined(value)) {
      this._board = value;
      this._board!.sensors = [];
      this.onBoardChange();
    }
  }

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {
    this.resizeSubscription = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    ).pipe(
      debounceTime(50),
      filter(() => this.autoResize)
    ).subscribe(() => {
      this.grid!.resize();
    });
  }

  generateLayout(): void {
    if (UtilService.isNullOrUndefined(this._board)) {
      return;
    }

    let i: number = 0;
    this.layout = [];
    for (let sensor of this._board!.sensors) {
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

    if (UtilService.isNullOrUndefined(this._board)) {
      return;
    }

    if (UtilService.isNullOrUndefined(localStorage.getItem(this.getLayoutKey()))) {
      this.generateLayout();
    } else {

      let savedLayout: KtdGridLayout = JSON.parse(localStorage.getItem(this.getLayoutKey())!);

      // Check if the layout saved in local storage contains all the sensors
      // First check if the number of sensors match
      // Then check if the sensor IDs match

      if (this._board!.sensors.length != savedLayout.length) {
        this.generateLayout();
        return;
      }

      for (let sensor of this._board!.sensors) {
        if (savedLayout.findIndex((gridItem) => gridItem.id === sensor.id) == -1) {
          this.generateLayout()
          return;
        }
      }

      this.layout = savedLayout;
    }

  }

  private getLayoutKey(): string {
    return this._board!.id + '-layout';
  }

  private getX(index: number) {
    return index % this.sensorColumns;
  }

  private getY(index: number) {
    return Math.floor(index / this.sensorColumns);
  }

  findSensorById(id: string): SensorModel {
    return this._board!.sensors.find(sensor => sensor.id == id)!;
  }

  onLayoutUpdate(layout: KtdGridLayout) {
    this.layout = layout;
    localStorage.setItem(this.getLayoutKey(), JSON.stringify(this.layout));
  }

  onBoardChange(): void {
    this.loadingSensors = true;
    this.greenhouseService.getSensors(this._board!).subscribe(
      sensors => {
        this._board!.sensors = sensors;
        this.getLayout();
      },
      () => {},
      () => {this.loadingSensors = false;}
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const newSensorColumns =
    this.sensorColumns = Math.round(2 + event.target.innerWidth / 1000);
    this.grid?.compactLayout();
    this.rowHeight = Math.round(event.target.innerWidth / 12 + 150 + 24);
  }

}
