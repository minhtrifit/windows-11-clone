import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WindowState {
  isCloseTargetWindow: boolean;
  targetWindow: React.ReactElement | null;
  targetWindowTabName: string;
  targetWindowTabIcon: React.ReactElement | null;
  updateIsCloseTargetWindow: (value: boolean) => void;
  updateTargetWindow: (element: React.ReactElement | null) => void;
  updateTargetWindowTabName: (name: string) => void;
  updateTargetWindowTabIcon: (element: React.ReactElement) => void;
}

export const useWindowStore = create<WindowState>()(
  devtools((set) => ({
    isCloseTargetWindow: false,
    targetWindow: null,
    targetWindowTabName: "",
    targetWindowTabIcon: null,
    updateIsCloseTargetWindow: (value) => set({ isCloseTargetWindow: value }),
    updateTargetWindow: (element) => set({ targetWindow: element }),
    updateTargetWindowTabName: (name) => set({ targetWindowTabName: name }),
    updateTargetWindowTabIcon: (element) =>
      set({ targetWindowTabIcon: element }),
  }))
);
