import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from '../styles/theme';
import {AppProps} from 'next/app';
import {createStyles} from '@material-ui/core/styles';
import {WithStyles, withStyles} from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      [theme.breakpoints.up("md")]: {
        padding: '3em 8em 0 8em', // padding to set app to middle of screen
      },
      [theme.breakpoints.down("md")]: {
        padding: '1em 1em 0 1em', // padding to set app to full screen
      },
      backgroundColor: theme.palette.primary.main
    }
  });

interface Props extends WithStyles<typeof styles>, AppProps {
  // pass, since all props were inherited
}

export const App = ({Component, pageProps, classes}: Props) => {
  return (
    <div className={classes.root}>
      <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div,
      div#__next > div > div {
        height: 100%;
      }
    `}</style>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};

export default withStyles(styles)(App);

