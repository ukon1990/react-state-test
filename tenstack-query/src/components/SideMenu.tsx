import {FC} from 'react';
import {Drawer, List, ListItemButton, ListItemText} from '@mui/material';
import {fetchGenres} from "../api/fetchers.ts";
import {useAppState} from "../state/AppState.tsx";
import {useQuery} from "@tanstack/react-query";

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({open, onClose}) => {
    const {selectedGenre, setSelectedGenre} = useAppState();

    const {data: genres} = useQuery({queryKey: ['genres'], queryFn: fetchGenres});

    const handleGenreSelect = (genreId: number | null) => {
        setSelectedGenre(genreId);
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                <ListItemButton
                    selected={selectedGenre === null}
                    onClick={() => handleGenreSelect(null)}
                >
                    <ListItemText primary="All Genres"/>
                </ListItemButton>
                {genres?.map((genre) => (
                    <ListItemButton
                        key={genre.id}
                        selected={selectedGenre === genre.id}
                        onClick={() => handleGenreSelect(genre.id)}
                    >
                        <ListItemText primary={genre.name}/>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};