import { Component, OnInit } from '@angular/core';
import {GreenhouseService} from "../../services/greenhouse.service";
import {BoardModel} from "../../models/board.model";
import {flatMap, mergeMap} from "rxjs";
import {TimeRangeModel} from "../../models/time-range.model";
import {UtilService} from "../../util/util.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  validTimeRange: TimeRangeModel = TimeRangeModel.createFullTimeRange();

  selectedDate: Date = new Date();
  dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(this.selectedDate);

  boards: BoardModel[] = [];

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {
    this.greenhouseService.getActivityTimeRange().subscribe(
      timeRange => {
        this.validTimeRange = timeRange;
        console.log(this.validTimeRange);
      }
    )

    this.greenhouseService.getBoards().subscribe(
      response => {
        this.boards = response;
      }
    );
  }

  onDateSelected(date: Date | null): void {
    if (!UtilService.isNullOrUndefined(date)) {
      this.selectedDate = date!;
      this.dataTimeRange = TimeRangeModel.createDailyTimeRange(this.selectedDate);
    }
  }

}
