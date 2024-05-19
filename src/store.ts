import { writable } from "svelte/store";

export const APP_STATUS = {
  INIT: 0,
  LOADING: 1,
  ERROR: -1,
  SUCCESS: 2,
};

export const appStatus = writable(APP_STATUS.INIT);
