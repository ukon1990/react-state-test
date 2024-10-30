import React, {useEffect} from 'react';
import {MovieCard} from './MovieCard';
import {CircularProgress, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {useQuery} from "@tanstack/react-query";
import {useAppState} from "../state/AppState.tsx";
import {fetchMovies} from "../api/fetchers.ts";

export const MovieList: React.FC = () => {
    const {searchQuery, selectedGenre} = useAppState();

    const {data: movies, isLoading, error} = useQuery(
        {
            queryKey: ['movies', searchQuery, selectedGenre],
            queryFn: () => fetchMovies(searchQuery, selectedGenre),
        }
    );
    useEffect(() => {
        fetchMovies(searchQuery, selectedGenre);
    }, [fetchMovies]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">An error occurred while fetching movies.</Typography>;
    if (!movies || movies.length === 0) return <Typography>No movies found.</Typography>;

    return (
        <Grid container spacing={2}>
            {movies?.map((movie) => (
                <Grid size={6} key={movie.id}>
                    <MovieCard movie={movie}/>
                </Grid>
            ))}
        </Grid>
    );
};
