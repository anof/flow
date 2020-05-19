import React, {FunctionComponent} from 'react';
import {createStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';
import theme from '../styles/theme';

const styles = () =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        padding: '3em 8em 0 8em', // padding to set app to middle of screen
      },
      [theme.breakpoints.down('md')]: {
        padding: '1em 1em 0 1em', // padding to set app to full screen
      },
    }
  });

export const Layout: FunctionComponent = ({children, classes}: any) => {
  return (
    <div>
      <div className={classes.root}>
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);