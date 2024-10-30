import {FC, useEffect} from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import {AppDispatch, RootState} from '../store/store.ts';
import {useDispatch, useSelector} from "react-redux";
import {fetchGenres} from "../store/genreSlice.ts";
import {fetchMovies, setSelectedGenre} from "../store/movieSlice.ts";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({ open, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { genres } = useSelector((state: RootState) => state.genres);
    const { selectedGenre } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        if (genres.length === 0) {
            dispatch(fetchGenres());
        }
    }, [dispatch, genres.length]);

    const handleGenreSelect = (genreId: number | null) => {
        dispatch(setSelectedGenre(genreId));
        dispatch(fetchMovies());
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
                        selected={selectedGenre === genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                    >
                        <ListItemText primary={genre.name} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};