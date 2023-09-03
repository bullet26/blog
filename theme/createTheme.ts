import { createTheme } from '@mui/material';
import { palette } from './config';

const themeBase = createTheme({ palette });

const theme = createTheme({
    ...themeBase,
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    padding: '12px 16px',
                    outline: themeBase.palette.border.default,
                    borderRadius: '16px',
                    '&:focus': {
                        color: themeBase.palette.primary.main,
                    },
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: themeBase.palette.text.primary,
                    },
                    input: {
                        padding: '12px 16px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid',
                            borderColor: themeBase.palette.primary.main,
                        },
                        '&.Mui-focused.MuiFormLabel-root': {
                            color: themeBase.palette.primary.main,
                        },
                    },
                },
            },
        },
    },
});

export default theme;
