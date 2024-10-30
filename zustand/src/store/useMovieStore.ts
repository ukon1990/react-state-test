import { create } from 'zustand';
import axios from 'axios';
import { Movie } from '../types/Movie';
import {Genre} from "../types/Genre.ts";

interface MovieStore {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    genres: Genre[];
    selectedGenre: Genre | null;
    searchQuery: string;
    fetchGenres: () => Promise<void>;
    setSelectedGenre: (genre: Genre | null) => void;
    setSearchQuery: (query: string) => void;
    fetchMovies: () => Promise<void>;
}

const BASE_URL = 'https://api.themoviedb.org/3'
const baseParams = {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
};

const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    loading: false,
    error: null,
    genres: [],
    selectedGenre: null,
    searchQuery: '',
    fetchGenres: async () => {
        try {
            const response = await axios.get(
                BASE_URL + '/genre/movie/list',
                {
                    params: baseParams,
                }
            );
            set({ genres: response.data.genres });
        } catch (error) {
            console.error('Failed to fetch genres:', error);
        }
    },
    setSelectedGenre: (genre) => set({ selectedGenre: genre }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    fetchMovies: async () => {
        set({ loading: true, error: null });
        try {
            let url = BASE_URL + '/movie/popular';
            const params: any = {
                ...baseParams,
                page: 1,
            };

            const { selectedGenre, searchQuery } = useMovieStore.getState();

            if (searchQuery) {
                url = BASE_URL + '/search/movie';
                params.query = searchQuery;
            } else if (selectedGenre) {
                url = BASE_URL + '/discover/movie';
                params.with_genres = selectedGenre.id;
            }

            const response = await axios.get(url, { params });
            set({ movies: response.data.results, loading: false });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },
}));

export default useMovieStore;
