import React, { useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import {MovieCard} from './MovieCard';
import {CircularProgress, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';

export const MovieList: React.FC = () => {
    const { movies, loading, error, fetchMovies } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

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
