import React, {FunctionComponent} from 'react';
import {createStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';

const styles = () =>
  createStyles({});

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