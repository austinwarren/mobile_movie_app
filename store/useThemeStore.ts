// src/store/useThemeStore.ts
import { create } from "zustand";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark", // default for your app

  setTheme: (theme) => set({ theme }),

  toggleTheme: () => {
    const current = get().theme;
    set({ theme: current === "dark" ? "light" : "dark" });
  },
}));
