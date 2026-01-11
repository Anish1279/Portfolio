import { create } from "zustand"

interface AppState {
  currentSection: "home" | "about" | "projects" | "coding"
  setSection: (section: "home" | "about" | "projects" | "coding") => void
  isMuted: boolean
  toggleMute: () => void
  isLoaded: boolean
  setLoaded: (loaded: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: "home",
  setSection: (section) => set({ currentSection: section }),
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}))
