import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-boolean-indicator',
  templateUrl: './boolean-indicator.component.html',
  styleUrls: ['./boolean-indicator.component.scss']
})
export class BooleanIndicatorComponent implements OnInit {

  @Input() value: boolean = false;
  @Input() width: number = 150;

  constructor() { }

  ngOnInit(): void {
  }

}
