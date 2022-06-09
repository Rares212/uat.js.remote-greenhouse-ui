import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public static MIN_DATE: Date = new Date(-8640000000000000);
  public static MAX_DATE: Date = new Date(8640000000000000);

  constructor(private datePipe: DatePipe) {}

  formatReadableDateTime(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'd/M/yy, HH:mm')!;
  }

  formatReadableTime(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'HH:mm')!;
  }

  formatDateTime(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'yyyy-MM-dd\'T\'HH:mm:ss')!;
  }

  formatDate(timestamp: Date): string {
    return this.datePipe.transform(timestamp, 'yy-MM-dd')!;
  }

  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static getBegginingOfDay(date: Date): Date {
    let newDate: Date = new Date(date.getTime());
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  public static getEndOfDay(date: Date): Date {
    let newDate: Date = new Date(date.getTime());
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  }

  public static clamp(x: number, min: number, max: number): number {
    return Math.min(Math.max(x, min), max);
  }

  public static waterHeightToLiters(height: number): number {
    return this.clamp(height * 3.4 - 9.16, 0.0, 250);
  }
}
