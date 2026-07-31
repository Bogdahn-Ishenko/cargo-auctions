import { create } from "zustand"

interface AuctionsListUiState {
  isFiltersOpen: boolean
  closeFilters: () => void
  toggleFilters: () => void
}

export const useAuctionsListUiStore = create<AuctionsListUiState>((set) => ({
  isFiltersOpen: false,
  closeFilters: () => set({ isFiltersOpen: false }),
  toggleFilters: () => set((state) => ({ isFiltersOpen: !state.isFiltersOpen })),
}))
