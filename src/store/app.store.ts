import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

interface AppState {
  characters: Character[];
  fetchCharacters: (page: number) => Promise<void>;
}

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      characters: [],
      fetchCharacters: async (page) => {
        try {
          const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
          const data = await res.json();
          set({ characters: data.results });
        } catch (error) {
          console.error("Failed to fetch characters", error);
        }
      },
    }),
    { name: "swapi-store" }
  )
);
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (username, password) => {
    if (username === "admin" && password === "password") {
      set({ isAuthenticated: true });
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));
