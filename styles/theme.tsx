import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CCCCCC',
      light: '#FFFFFF',
      dark: '#999999',
      contrastText: '#000000'
    },
    secondary: {
      main: '#20d8da',
      light: '#6ffffd',
      dark: '#00a6a8',
      contrastText: '#000000'
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff'
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff'
    },
    background: {
      default: '#CCCCCC',
      paper: '#FFFFFF'
    }
  }
});

export default theme;