import { FC } from 'react';
import {MovieCard} from './MovieCard';
import {CircularProgress, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';
import useMovies from "../hooks/useMovies.ts";

export const MovieList: FC = () => {
    const { data: movies, isLoading, error } = useMovies();

    if (isLoading) return <CircularProgress />;
    if (error)
        return (
          <Typography color="error">
              An error occurred while fetching movies.
          </Typography>
        );
    if (!movies || movies.length === 0)
        return <Typography>No movies found.</Typography>;

    return (
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
          {movies.map((movie) => (
            <Grid size={6} key={movie.id}>
              <MovieCard movie={movie}/>
            </Grid>
          ))}
      </Grid>
    );
};
