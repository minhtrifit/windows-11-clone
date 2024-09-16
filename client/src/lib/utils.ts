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

export const FILE_EXPLORER_APP_NAME = {
  ["notepad"]: "notepad",
  ["text_document"]: "text_document",
};

export const SETTING_NAME = {
  home: "Home",
  system: "System",
  ["bluetooth_and_devices"]: "Bluetooth & devices",
  ["network_and_internet"]: "Network & internet",
  ["personalize"]: "Personalize",
  ["apps"]: "Apps",
  ["accounts"]: "Accounts",
  ["time_and_language"]: "Time & language",
  ["gaming"]: "Gaming",
  ["accessibility"]: "Accessibility",
  ["privacy_and_security"]: "Privacy & security",
  ["windows_update"]: "Windows Update",
};

export const FILE_EXPLORER_TAB_NAME = {
  home: "Home",
  gallery: "Gallery",
  oneDrive: "OneDrive",
  desktop: "Desktop",
  downloads: "Downloads",
  documents: "Documents",
  pictures: "Picture",
  music: "Music",
  videos: "Videos",
  thisPC: "This PC",
  network: "Network",
};

export const BACKGROUND_URLS: string[] = [
  "/Images/1.jpg",
  "/Images/2.jpg",
  "/Images/3.jpg",
  "/Images/4.jpg",
  "/Images/5.jpg",
];

export const LOCK_SCREEN_BACKGROUND_URLS: string[] = ["/Images/lock1.jpg"];

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

export const autoGenerateName = (list: APP_TYPE[]) => {
  const baseName = "Untitled";
  let newName = baseName;
  let count = 0;

  // Loop to find the next available name
  while (list.some((item) => item.targetElementTabName === newName)) {
    count++;
    newName = `${baseName} (${count})`;
  }

  return newName;
};
