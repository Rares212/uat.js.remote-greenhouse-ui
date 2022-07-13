import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
import {BehaviorSubject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../pages/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static EMPTY_AUTH_TOKEN = '';
  public static SESSION_ID_KEY = 'JSESSIONID';

  basicAuthToken: BehaviorSubject<string> = new BehaviorSubject(AuthService.EMPTY_AUTH_TOKEN);

  constructor(private cookieService: CookieService, private dialogRef: MatDialogRef<LoginComponent>) { }

  public openLoginModal(): void {

  }

  public setAuthToken(username: string, password: string): void {
    this.basicAuthToken.next("Basic " + btoa(username + ":" + password));
  }

  public logout(): void {
    this.basicAuthToken.next(AuthService.EMPTY_AUTH_TOKEN);
    this.cookieService.delete(AuthService.SESSION_ID_KEY);
  }
}
