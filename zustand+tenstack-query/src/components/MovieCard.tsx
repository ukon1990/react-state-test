import {FC} from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Movie } from '../types/Movie';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="500"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {movie.release_date}
                </Typography>
            </CardContent>
        </Card>
    );
};