// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// HOME NETWORK
// export const serverAPIURL = 'http://192.168.1.9:8081';

// WORK NETWORK
// export const serverAPIURL = 'http://192.168.255.238:8081';

// BAR HI NETWORK
export const serverAPIURL = 'http://192.168.254.215:8081';

// BAR NETWORK
// export const serverAPIURL = 'http://192.168.100.66:8081';

// LOCALHOST
// export const serverAPIURL = 'http://localhost:8081';

export const MONTHS_ABR = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const TOASTER_CONFIGURATION = {
  timeOut: 7000, 
  positionClass: 'toast-bottom-right'
}

export const CREATE_DIALOG_CONFIGURATION = {
  width: '700px',
  disableClose: true
}

// Template Settings
export const SIDEBAR_WIDTH = 280

// Pagination Options
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const PAGE_SIZE = 20;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
