'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            default: '#FFFFFF',
            paper: '#F7F6F3',
        },
        primary: {
            main: '#1976d2', // Your primary color
        },
        secondary: {
            main: '#dc004e', // Your secondary color
        },
        },
        typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: 18,
            // fontWeight: 'bold',
            // textDecoration: 'underline',
        },
        h2: {
            fontSize: 18,
            // fontWeight: 'bold',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
            disableElevation: true, // Disable elevation globally for all Buttons
            },
            styleOverrides: {
            root: {
                borderRadius: 8, // Customize button border radius
            },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#000000', // Black color for all links
                    textDecoration: 'none', // Remove the default underline
                    '&:hover': {
                        textDecoration: 'underline', // Add underline on hover
                    },
                },
            },
        },
    },
});

export default theme;