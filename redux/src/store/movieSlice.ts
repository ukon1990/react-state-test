import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from '../types/Movie';
import { RootState } from './store';

interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    selectedGenre: number | null;
    searchQuery: string;
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
    selectedGenre: null,
    searchQuery: '',
};

export const fetchMovies = createAsyncThunk<Movie[], void, { state: RootState }>(
    'movies/fetchMovies',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let url = 'https://api.themoviedb.org/3/movie/popular';
            const params: any = {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                language: 'en-US',
                page: 1,
            };

            if (state.movies.searchQuery) {
                url = 'https://api.themoviedb.org/3/search/movie';
                params.query = state.movies.searchQuery;
            } else if (state.movies.selectedGenre) {
                url = 'https://api.themoviedb.org/3/discover/movie';
                params.with_genres = state.movies.selectedGenre;
            }

            const response = await axios.get(url, { params });
            return response.data.results;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSelectedGenre(state, action: PayloadAction<number | null>) {
            state.selectedGenre = action.payload;
        },
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedGenre, setSearchQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
