import {Component, Input, OnInit} from '@angular/core';
import {BoardModel} from "../../models/board.model";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  @Input() board: BoardModel = BoardModel.createEmptyBoard();

  constructor() { }

  ngOnInit(): void {
  }

}
