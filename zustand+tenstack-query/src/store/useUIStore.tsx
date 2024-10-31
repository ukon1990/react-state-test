import { create } from 'zustand';

interface UIState {
  searchQuery: string;
  selectedGenre: number | null;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
}

const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  selectedGenre: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genreId) => set({ selectedGenre: genreId }),
}));

export default useUIStore;