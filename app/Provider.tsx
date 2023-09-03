'use client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: ReactNode }) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },
            })
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </ThemeProvider>
    );
}
