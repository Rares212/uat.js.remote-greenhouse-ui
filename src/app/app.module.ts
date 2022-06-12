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
import { BooleanIndicatorComponent } from './components/boolean-indicator/boolean-indicator.component';

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

    TimeagoModule.forRoot()

  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
