import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import {AppProps} from 'next/app';
import {CssBaseline} from '@mui/material';


export const App = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;

