import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SETTING_NAME } from "./utils";
import { APP_TYPE } from "./types";

interface WindowState {
  isCloseTargetWindow: boolean;
  isTargetWindowTab: boolean;
  targetWindow: React.ReactElement | null;
  targetWindowName: string;
  targetWindowTabName: string;
  targetWindowTabIcon: React.ReactElement | null;
  updateIsCloseTargetWindow: (value: boolean) => void;
  updateIsTargetWindowTab: (value: boolean) => void;
  updateTargetWindow: (element: React.ReactElement | null) => void;
  updateTargetWindowName: (element: string) => void;
  updateTargetWindowTabName: (name: string) => void;
  updateTargetWindowTabIcon: (element: React.ReactElement) => void;
}

export const useWindowStore = create<WindowState>()(
  devtools((set) => ({
    isCloseTargetWindow: false,
    isTargetWindowTab: false,
    targetWindow: null,
    targetWindowName: "",
    targetWindowTabName: "",
    targetWindowTabIcon: null,
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
