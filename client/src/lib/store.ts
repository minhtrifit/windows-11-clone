import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  users: any[];
  updateUsers: (data: any[]) => void;
}

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    users: [],
    updateUsers: (data) => set({ users: data }),
  }))
);
