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
  ["visualcode"]: "visual_code",
  ["app_custom"]: "app_custom",
  ["paint"]: "paint",
  ["calculator"]: "calculator",
  ["spotify"]: "spotify",
};

export const FILE_EXPLORER_APP_NAME = {
  ["notepad"]: "notepad",
  ["text_document"]: "text_document",
  ["pictures"]: "pictures",
  ["videos"]: "videos",
  ["music"]: "music",
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

export const IMAGE_TYPES = ["png", "jpg", "jpeg"];
export const VIDEO_TYPES = ["mp4"];
export const AUDIO_TYPES = ["mp3"];

export const CODE_LANGUAGES = {
  javascript: {
    name: "javascript",
    version: "18.15.0",
    extension: ".js",
    command: "node",
  },
  typescript: {
    name: "typescript",
    version: "5.0.3",
    extension: ".ts",
    command: "node",
  },
  python: {
    name: "python",
    version: "3.10.0",
    extension: ".py",
    command: "py",
  },
  java: {
    name: "java",
    version: "15.0.2",
    extension: ".java",
    command: "java",
  },
  csharp: {
    name: "csharp",
    version: "6.12.0",
    extension: ".cs",
    command: "cs",
  },
  php: {
    name: "php",
    version: "8.2.3",
    extension: ".php",
    command: "php",
  },
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello Javascript from " + name + " with love <3");\n}\n\ngreet("minhtrifit");\n`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello Typescript from " + data.name + " with love <3");\n}\n\ngreet({ name: "minhtrifit" });\n`,
  python: `def greet(name):\n\tprint(name)\n\ngreet("Hello Python from minhtrifit with love <3")\n`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello Java from minhtrifit with love <3");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello C# from minhtrifit with love <3");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Hello Php from minhtrifit with love <3';\necho $name;\n",
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

export const getFileCountsByType = (list: APP_TYPE[], type: string) => {
  let count: number = 0;

  for (let i = 0; i < list?.length; ++i) {
    if (list[i]?.type === type) ++count;
  }

  return count;
};

export const getFormattedTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // For AM/PM format
  });
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
