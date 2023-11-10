import React from 'react';
import ThemeProvider from './ThemeProvider';
import {Theme} from "@/shared/const/theme";

export const withTheme = (Component: React.ComponentType) => {
    return () => {
        return (
            <ThemeProvider initialTheme={Theme.LIGHT}>
                <Component />
            </ThemeProvider>
        );
    };
};
