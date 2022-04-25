import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { SensorDetailsComponent } from './components/sensor-details/sensor-details.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    BoardDetailsComponent,
    SensorDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        NgbModule,
        NgxChartsModule
    ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
