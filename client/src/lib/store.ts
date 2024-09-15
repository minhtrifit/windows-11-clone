import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  BACKGROUND_URLS,
  LOCK_SCREEN_BACKGROUND_URLS,
  SETTING_NAME,
} from "./utils";
import { APP_TYPE } from "./types";
import { RefObject } from "react";

interface WindowState {
  parentChildRef: RefObject<HTMLDivElement> | null;
  isCloseTargetWindow: boolean;
  isTargetWindowTab: boolean;
  targetWindow: React.ReactElement | null;
  targetWindowName: string;
  targetWindowTabName: string;
  targetWindowTabIcon: React.ReactElement | null;
  updateParentChildRef: (value: RefObject<HTMLDivElement>) => void;
  updateIsCloseTargetWindow: (value: boolean) => void;
  updateIsTargetWindowTab: (value: boolean) => void;
  updateTargetWindow: (element: React.ReactElement | null) => void;
  updateTargetWindowName: (element: string) => void;
  updateTargetWindowTabName: (name: string) => void;
  updateTargetWindowTabIcon: (element: React.ReactElement) => void;
}

export const useWindowStore = create<WindowState>()(
  devtools((set) => ({
    parentChildRef: null,
    isCloseTargetWindow: true,
    isTargetWindowTab: false,
    targetWindow: null,
    targetWindowName: "",
    targetWindowTabName: "",
    targetWindowTabIcon: null,
    updateParentChildRef: (value) => set({ parentChildRef: value }),
    updateIsCloseTargetWindow: (value) => set({ isCloseTargetWindow: value }),
    updateIsTargetWindowTab: (value) => set({ isTargetWindowTab: value }),
    updateTargetWindow: (element) => set({ targetWindow: element }),
    updateTargetWindowName: (name) => set({ targetWindowName: name }),
    updateTargetWindowTabName: (name) => set({ targetWindowTabName: name }),
    updateTargetWindowTabIcon: (element) =>
      set({ targetWindowTabIcon: element }),
  }))
);

interface NavbarState {
  appList: APP_TYPE[];
  isOpenStart: boolean;
  updateIsOpenStart: (value: boolean) => void;
  updateAppList: (list: APP_TYPE[]) => void;
  addAppList: (app: APP_TYPE) => void;
}

export const useNavbarStore = create<NavbarState>()(
  devtools((set) => ({
    appList: [],
    isOpenStart: false,
    updateIsOpenStart: (value) => set({ isOpenStart: value }),
    updateAppList: (list) => set({ appList: list }),
    addAppList: (app: APP_TYPE) =>
      set((state) => ({ appList: [...state.appList, app] })),
  }))
);

interface SettingState {
  settingTab: string;
  updateSettingTab: (value: string) => void;
}

export const useSettingStore = create<SettingState>()(
  devtools((set) => ({
    settingTab: SETTING_NAME.home,
    updateSettingTab: (name) => set({ settingTab: name }),
  }))
);

interface PersonalizeSettingState {
  backgroundUrl: string;
  lockScreenBackgroundUrl: string;
  backgroundUrlList: string[];
  updateBackgroundUrl: (url: string) => void;
  updateLockScreenBackgroundUrl: (url: string) => void;
  addBackgroundUrlList: (url: string) => void;
}

export const usePersonalizeSettingStore = create<PersonalizeSettingState>()(
  devtools((set) => ({
    backgroundUrl: BACKGROUND_URLS[0],
    lockScreenBackgroundUrl: LOCK_SCREEN_BACKGROUND_URLS[0],
    backgroundUrlList: BACKGROUND_URLS,
    updateBackgroundUrl: (url) => set({ backgroundUrl: url }),
    updateLockScreenBackgroundUrl: (url) =>
      set({ lockScreenBackgroundUrl: url }),
    addBackgroundUrlList: (url: string) =>
      set((state) => ({
        backgroundUrlList: [...state.backgroundUrlList, url],
      })),
  }))
);

interface FileExplorerWindowState {
  isCloseTargetWindow: boolean;
  isTargetWindowTab: boolean;
  targetWindow: React.ReactElement | null;
  targetWindowName: string;
  targetWindowTabName: string;
  targetWindowTabIcon: React.ReactElement | null;
  targetSubWindowName: string;
  isCloseTargetSubWindow: boolean;
  itemList: APP_TYPE[];
  isNewItem: boolean;
  updateIsCloseTargetWindow: (value: boolean) => void;
  updateIsTargetWindowTab: (value: boolean) => void;
  updateTargetWindow: (element: React.ReactElement | null) => void;
  updateTargetWindowName: (element: string) => void;
  updateTargetWindowTabName: (name: string) => void;
  updateTargetWindowTabIcon: (element: React.ReactElement) => void;
  updateTargetSubWindowName: (element: string) => void;
  updateIsCloseTargetSubWindow: (value: boolean) => void;
  updateItemList: (newList: APP_TYPE[]) => void;
  addItemList: (app: APP_TYPE) => void;
  updateIsNewItem: (value: boolean) => void;
}

export const useFileExplorerWindowStore = create<FileExplorerWindowState>()(
  devtools((set) => ({
    isCloseTargetWindow: false,
    isTargetWindowTab: true,
    targetWindow: null,
    targetWindowName: "",
    targetWindowTabName: "",
    targetWindowTabIcon: null,
    targetSubWindowName: "",
    isCloseTargetSubWindow: true,
    itemList: [],
    isNewItem: false,
    updateIsCloseTargetWindow: (value) => set({ isCloseTargetWindow: value }),
    updateIsTargetWindowTab: (value) => set({ isTargetWindowTab: value }),
    updateTargetWindow: (element) => set({ targetWindow: element }),
    updateTargetWindowName: (name) => set({ targetWindowName: name }),
    updateTargetWindowTabName: (name) => set({ targetWindowTabName: name }),
    updateTargetWindowTabIcon: (element) =>
      set({ targetWindowTabIcon: element }),
    updateTargetSubWindowName: (name) => set({ targetSubWindowName: name }),
    updateIsCloseTargetSubWindow: (value) =>
      set({ isCloseTargetSubWindow: value }),
    updateItemList: (newList: APP_TYPE[]) =>
      set(() => ({
        itemList: newList,
      })),
    addItemList: (app: APP_TYPE) =>
      set((state) => ({
        itemList: [...state.itemList, app],
      })),
    updateIsNewItem: (value) => set({ isNewItem: value }),
  }))
);

interface TextDocumentState {
  itemData: APP_TYPE | null;
  updateItemData: (data: APP_TYPE | null) => void;
}

export const useTextDocumentStore = create<TextDocumentState>()(
  devtools((set) => ({
    itemData: null,
    updateItemData: (data) => set({ itemData: data }),
  }))
);
