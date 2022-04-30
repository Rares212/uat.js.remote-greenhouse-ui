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

  dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());

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

  onStartDateSelected(date: Date | null) {
    if (!UtilService.isNullOrUndefined(date)) {
      date?.setHours(0);
      this.dataTimeRange.from = date!;
    }
  }

  onEndDateSelected(date: Date | null) {
    if (!UtilService.isNullOrUndefined(date)) {
      date?.setHours(23, 59, 59, 999);
      this.dataTimeRange = new TimeRangeModel(this.dataTimeRange.from, date!);
    }
  }

}
