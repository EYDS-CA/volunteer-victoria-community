import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat', 'sans-serif'
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h5: {
      color: '#002C71',
      fontSize: '27px',
      fontWeight: 600,
      padding: '1.5rem 0'
    },
    h6: {
      fontSize: '20px',
      fontWeight: 600
    },
    subtitle1: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    subtitle2: {
      fontSize: '1.3rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '1rem'
    },
  },
  palette: {
  }
});

