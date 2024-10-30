import {FC, useEffect} from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import useMovieStore from '../store/useMovieStore';
import { Genre } from '../types/Genre';

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({ open, onClose }) => {
    const { genres, fetchGenres, setSelectedGenre, selectedGenre, fetchMovies } = useMovieStore();

    useEffect(() => {
        if (genres.length === 0) {
            fetchGenres();
        }
    }, [fetchGenres, genres.length]);

    const handleGenreSelect = (genre: Genre | null) => {
        setSelectedGenre(genre);
        fetchMovies();
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                <ListItemButton selected={selectedGenre === null} onClick={() => handleGenreSelect(null)}>
                    <ListItemText primary="All Genres" />
                </ListItemButton>
                {genres.map((genre) => (
                    <ListItemButton
                        key={genre.id}
                        selected={selectedGenre?.id === genre.id}
                        onClick={() => handleGenreSelect(genre)}
                    >
                        <ListItemText primary={genre.name} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};