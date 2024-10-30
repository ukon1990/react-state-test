import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Genre } from '../types/Genre';

interface GenresState {
    genres: Genre[];
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    genres: [],
    loading: false,
    error: null,
};

export const fetchGenres = createAsyncThunk<Genre[], void>(
    'genres/fetchGenres',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: import.meta.env.VITE_TMDB_API_KEY,
                    language: 'en-US',
                },
            });
            return response.data.genres;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<Genre[]>) => {
                state.genres = action.payload;
                state.loading = false;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default genresSlice.reducer;
