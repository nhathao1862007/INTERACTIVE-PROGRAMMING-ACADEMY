/**
 * @module lib/store/shell
 * Global shell UI state (mobile navigation + command palette).
 * Kept separate from data stores so shell chrome never re-renders page data.
 */
import { create } from "zustand";

interface ShellState {
  mobileNavOpen: boolean;
  paletteOpen: boolean;
  setMobileNav: (open: boolean) => void;
  setPalette: (open: boolean) => void;
}

export const useShellStore = create<ShellState>((set) => ({
  mobileNavOpen: false,
  paletteOpen: false,
  setMobileNav: (open) => set({ mobileNavOpen: open }),
  setPalette: (open) => set({ paletteOpen: open }),
}));
