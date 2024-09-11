import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface WindowState {
  targetWindow: React.ReactElement | null;
  updateTargetWindow: (element: React.ReactElement | null) => void;
}

export const useWindowStore = create<WindowState>()(
  devtools((set) => ({
    targetWindow: null,
    updateTargetWindow: (element) => set({ targetWindow: element }),
  }))
);
