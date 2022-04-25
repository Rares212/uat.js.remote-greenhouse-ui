import { Component, OnInit } from '@angular/core';
import {GreenhouseService} from "../../services/greenhouse.service";
import {BoardModel} from "../../models/board.model";
import {flatMap, mergeMap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards: BoardModel[] = [];

  constructor(private greenhouseService: GreenhouseService) { }

  ngOnInit(): void {
    this.greenhouseService.getBoardsWithData().subscribe(
      resp => {
        this.boards = resp;
        console.log(this.boards);
      }
    )
  }

}
