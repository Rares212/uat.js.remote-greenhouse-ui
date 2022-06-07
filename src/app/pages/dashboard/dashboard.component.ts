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

  constructor() { }

  ngOnInit(): void {}

}
