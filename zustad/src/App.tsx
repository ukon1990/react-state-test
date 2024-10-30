import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Container, InputBase } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import {SideMenu} from './components/SideMenu';
import {MovieList} from './components/MovieList';
import useMovieStore from './store/useMovieStore';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: 'auto',
    flexGrow: 1,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const App: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { setSearchQuery, fetchMovies } = useMovieStore();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchMovies();
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => setMenuOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Movie App
                    </Typography>
                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexGrow: 1 }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search movies..."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleSearch}
                            />
                        </Search>
                    </form>
                </Toolbar>
            </AppBar>
            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <Container>
                <MovieList />
            </Container>
        </>
    );
};

export default App;
