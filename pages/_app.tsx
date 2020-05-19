import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../styles/theme';
import {AppProps} from 'next/app';
import {CssBaseline} from '@material-ui/core';


export const App = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;

