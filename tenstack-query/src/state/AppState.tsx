import React, { createContext, useContext, useState } from 'react';

interface AppStateContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedGenre: number | null;
    setSelectedGenre: (genreId: number | null) => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    return (
        <AppStateContext.Provider
            value={{ searchQuery, setSearchQuery, selectedGenre, setSelectedGenre }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = (): AppStateContextProps => {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
