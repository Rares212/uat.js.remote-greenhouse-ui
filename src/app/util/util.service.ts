import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private datePipe: DatePipe) {}

  formatDateTime(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'yyyy-MM-dd\'T\'HH:mm:ss')!;
  }

  formatDate(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'yy-MM-dd')!;
  }

  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }
}
