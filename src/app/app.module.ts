import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {BoardDetailsComponent} from './components/board-details/board-details.component';
import {SensorDetailsComponent} from './components/sensor-details/sensor-details.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {KtdGridModule} from "@katoid/angular-grid-layout";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {GreenhouseDetailsComponent} from './components/greenhouse-details/greenhouse-details.component';
import {MatIconModule} from "@angular/material/icon";
import {UserCardComponent} from './components/user-card/user-card.component';
import {MatChipsModule} from "@angular/material/chips";
import {TimeagoModule} from "ngx-timeago";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {BooleanIndicatorComponent} from './components/boolean-indicator/boolean-indicator.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LOADING_BAR_CONFIG, LoadingBarModule} from "@ngx-loading-bar/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {
  NgHttpCachingConfig,
  NgHttpCachingEntry,
  NgHttpCachingLocalStorage,
  NgHttpCachingModule,
  NgHttpCachingSessionStorage
} from "ng-http-caching";
import {LoginComponent} from "./pages/login/login.component";
import {CookieService} from "ngx-cookie-service";
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";

const httpCachingConfig: NgHttpCachingConfig = {
  version: '1',
  lifetime: 1000 * 60 * 5, // Expire cache after 5 minutes
  store: new NgHttpCachingSessionStorage()
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    BoardDetailsComponent,
    SensorDetailsComponent,
    GreenhouseDetailsComponent,
    UserCardComponent,
    BooleanIndicatorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    NgbModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    KtdGridModule,
    MatTabsModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,

    TimeagoModule.forRoot(),

    LoadingBarHttpClientModule,
    LoadingBarModule,

    //NgHttpCachingModule.forRoot(httpCachingConfig)
  ],
  providers: [
    DatePipe,
    CookieService,
    {
      provide: LOADING_BAR_CONFIG,
      useValue: {latencyThreshold: 100}
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
