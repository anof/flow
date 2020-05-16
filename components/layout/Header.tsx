import React, {FunctionComponent} from 'react';
import {createStyles, withStyles} from '@material-ui/core/styles';

const styles = () =>
  createStyles({});

export const Header: FunctionComponent = (props: any) => {
  const {classes} = props;
  return (
    <div>
      Header
    </div>
  );
};

export default withStyles(styles)(Header);
