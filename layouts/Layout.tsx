import React, {FunctionComponent} from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {Paper} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';

const styles = () =>
  createStyles({});

export const Layout: FunctionComponent = ({children, classes}: any) => {
  return (
    <div>
      <Paper className={classes.root}>
        {children}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Layout);