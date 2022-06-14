import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BoardModel} from "../models/board.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {SensorModel} from "../models/sensor.model";
import {DataItem} from "@swimlane/ngx-charts";
import {UtilService} from "../util/util.service";
import {TimeRangeModel} from "../models/time-range.model";

@Injectable({
  providedIn: 'root'
})
export class GreenhouseService {

  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });

  constructor(private http: HttpClient, private utilService: UtilService) { }

  public getBoards(): Observable<BoardModel[]> {
    const url = environment.baseUrl + environment.boardsPath;
    return this.http.get<BoardModel[]>(url, { headers: this.headers });
  }

  public getSensors(board: BoardModel): Observable<SensorModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("boardId", board.id);

    const url = environment.baseUrl + environment.sensorsPath;
    return this.http.get<SensorModel[]>(url, { headers: this.headers, params: params });
  }

  public getMeasurements(sensor: SensorModel, from?: Date, to?: Date): Observable<DataItem[]> {
    let params: HttpParams = this.getDateParams(from, to);
    params = params.append('sensorId', sensor.id);

    const url = environment.baseUrl + environment.measurementsPath;
    return this.http.get<DataItem[]>(environment.measurementsPath, { headers: this.headers, params: params });
  }

  public getActivityTimeRange(): Observable<TimeRangeModel> {
    const url = environment.baseUrl + environment.activityTimeRangePath;
    return this.http.get<TimeRangeModel>(environment.activityTimeRangePath, { headers: this.headers });
  }

  private getDateParams(from?: Date, to?: Date): HttpParams {
    let params: HttpParams = new HttpParams();
    if (!UtilService.isNullOrUndefined(from)) {
      params = params.append('from', this.utilService.formatDateTime(from!));
    }
    if (!UtilService.isNullOrUndefined(to)) {
      params = params.append('to', this.utilService.formatDateTime(to!));
    }
    return params;
  }
}
