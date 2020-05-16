import React from 'react';
import {Button as MUIButton} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core';
import {createStyles, withStyles} from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      padding: '0.5em 2em 0.5em 2em',
      borderRadius: '0',
      fontWeight: 'normal',
    }
  });


export const Button = (props: ButtonProps) => {
  return (
    <MUIButton {...props}/>
  );
};

export default withStyles(styles)(Button);