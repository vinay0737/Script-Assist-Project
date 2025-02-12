import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true",

      login: (username, password) => {
        if (username === "admin" && password === "password") {
          localStorage.setItem("isAuthenticated", "true");
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        localStorage.removeItem("isAuthenticated");
        set({ isAuthenticated: false });
      },
    }),
    { name: "auth-store" }
  )
);
