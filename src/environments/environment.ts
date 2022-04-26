// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  getBoardsWithDataPath: '/api/boards/get-boards-with-data',
  getBoardsPath: '/api/boards/get-boards',
  getMeasurementsPath: '/api/measurements/get-measurements-by-sensor',
  getLatestMeasurementPath: '/api/measurements/get-latest-measurement-by-sensor',
  getSensorsPath: '/api/sensors/get-sensors-by-board',
  getActivityTimeRangePath: 'api/greenhouse/activity-time-range'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
