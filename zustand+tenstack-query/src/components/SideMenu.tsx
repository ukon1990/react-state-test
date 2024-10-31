import {FC} from 'react';
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import useGenres from "../hooks/useGendre.ts";
import useUIStore from '../store/useUIStore.tsx';

interface SideMenuProps {
    open: boolean;
    onClose: () => void;
}

export const SideMenu: FC<SideMenuProps> = ({ open, onClose }) => {
    const { data: genres } = useGenres();
    const selectedGenre = useUIStore((state) => state.selectedGenre);
    const setSelectedGenre = useUIStore((state) => state.setSelectedGenre);

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
                  <ListItemText primary="All Genres" />
              </ListItemButton>
              {genres?.map((genre) => (
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