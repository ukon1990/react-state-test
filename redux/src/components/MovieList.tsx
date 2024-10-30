import React, { useEffect } from 'react';
import {AppDispatch, RootState} from '../store/store.ts';
import {MovieCard} from './MovieCard';
import {CircularProgress, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {fetchMovies} from "../store/movieSlice.ts";
import {useDispatch, useSelector} from "react-redux";

export const MovieList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, loading, error } = useSelector((state: RootState) => state.movies);
    const { selectedGenre, searchQuery } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch, selectedGenre, searchQuery]);


    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Grid container spacing={2}>
            {movies.map((movie) => (
                <Grid size={6} key={movie.id}>
                    <MovieCard movie={movie} />
                </Grid>
            ))}
        </Grid>
    );
};
