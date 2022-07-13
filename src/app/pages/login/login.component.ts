import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string | undefined;
  public password: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {

  }

}
