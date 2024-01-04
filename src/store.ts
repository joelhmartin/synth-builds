import { create } from "zustand";

interface Query {
  genre?: string;
  producer?: string;
  sortOrder?: string;
  searchText?: string;
}

interface QueryStore {
  synthQuery: Query;
  setSearchText: (searchText: string) => void;
  setGenre: (genre: string) => void;
  setProducer: (producer: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useSynthStore = create<QueryStore>((set) => ({
  synthQuery: {} as Query,
  setSearchText: (searchText: string) =>
    set(() => ({ synthQuery: { searchText } })),
  setGenre: (genre: string) =>
    set((state) => ({ synthQuery: { ...state.synthQuery, genre } })),
  setProducer: (producer: string) =>
    set((state) => ({ synthQuery: { ...state.synthQuery, producer } })),
  setSortOrder: (sortOrder: string) =>
    set((state) => ({ synthQuery: { ...state.synthQuery, sortOrder } })),
}));

export default useSynthStore;
