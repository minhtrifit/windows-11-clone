import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
