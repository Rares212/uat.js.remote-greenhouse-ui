import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../models/board.model";
import {GreenhouseService} from "../../services/greenhouse.service";
import {TimeRangeModel} from "../../models/time-range.model";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  @Input() board: BoardModel = BoardModel.createEmptyBoard();
  @Input() sensorColumns: number = 2;
  @Input() dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());

  showData: boolean = false;

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {
    this.greenhouseService.getSensors(this.board).subscribe(
      sensors => {
        this.board.sensors = sensors;
      }
    )
  }

}
