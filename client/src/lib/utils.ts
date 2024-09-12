import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_TYPE } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const APP_NAME = {
  browser: "browser",
  ["file_explorer"]: "file_explorer",
  ["settings"]: "settings",
};

export const SETTING_NAME = {
  home: "Home",
  system: "System",
  ["bluetooth_and_devices"]: "Bluetooth & devices",
  ["personalize"]: "Personalize",
};

export const checkIsExistNavbarAppList = (
  list: APP_TYPE[],
  appName: string
) => {
  for (let i = 0; i < list.length; ++i)
    if (list[i].targetElementname === appName) return true;

  return false;
};

export const filterNavbarListByName = (
  fixedList: APP_TYPE[],
  appName: string
) => {
  const filterList: APP_TYPE[] = [];

  for (let i = 0; i < fixedList.length; ++i) {
    if (fixedList[i].targetElementname !== appName)
      filterList.push(fixedList[i]);
  }

  return filterList;
};

export const getAppByName = (list: APP_TYPE[], appName: string) => {
  for (let i = 0; i < list.length; ++i) {
    if (list[i].targetElementname === appName) return list[i];
  }

  return null;
};
