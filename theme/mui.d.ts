import { CSSProperties } from 'react';

declare module '@mui/material/styles/createPalette' {
    interface PaletteColor {
        light?: string;
        extraLight?: string;
        lightGrey?: string;
        white?: string;
    }

    interface Palette {
        border: {
            default: string;
        };
        background: {
            main: string;
            secondry: string;
            default: string;
        };
    }

    interface TypeBackground {
        main: string;
        default: string;
        secondry: string;
    }
}

declare module '@mui/material/styles' {
    interface TypeText {
        contrast: string;
        secondary: string;
        contrast: string;
    }
}
