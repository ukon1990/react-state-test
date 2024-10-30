import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movieSlice';
import genresReducer from './genreSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
