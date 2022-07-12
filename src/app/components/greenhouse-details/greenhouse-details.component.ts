import { Component, OnInit } from '@angular/core';
import {TimeRangeModel} from "../../models/time-range.model";
import {BoardModel} from "../../models/board.model";
import {GreenhouseService} from "../../services/greenhouse.service";
import {UtilService} from "../../util/util.service";

@Component({
  selector: 'app-greenhouse-details',
  templateUrl: './greenhouse-details.component.html',
  styleUrls: ['./greenhouse-details.component.scss']
})
export class GreenhouseDetailsComponent implements OnInit {

  validTimeRange: TimeRangeModel = TimeRangeModel.createFullTimeRange();

  dataTimeRange: TimeRangeModel = TimeRangeModel.createDailyTimeRange(new Date());

  boards: BoardModel[] = [];
  selectedBoard: BoardModel | undefined = undefined;

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {

    this.greenhouseService.getActivityTimeRange().subscribe(
      timeRange => {
        this.validTimeRange = timeRange;
      }
    )

    this.greenhouseService.getBoards().subscribe(
      response => {
        this.boards = response;
        if (this.boards.length > 0) {
          this.selectedBoard = this.boards[0];
        }
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

  onTabIndexChange(index: number) {
    this.selectedBoard = this.boards[index];
  }

}
