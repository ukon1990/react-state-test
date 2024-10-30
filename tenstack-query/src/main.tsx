import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {AppStateProvider} from "./state/AppState.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
            <AppStateProvider>
                <App />
            </AppStateProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
