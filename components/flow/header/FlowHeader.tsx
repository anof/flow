import React, {FC} from 'react';
import {createStyles, WithStyles, withStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';
import ControlButtons from './ControlButtons';
import {modeTypes} from '../../../customTypes';

const styles = () =>
  createStyles({
    root: {
      paddingBottom: '1em',
    }
  });

interface Props extends WithStyles<typeof styles> {
  mode: modeTypes,
  handleChangeMode: (mode: modeTypes)=>void,
}

const FlowHeader = ({classes, mode, handleChangeMode}: Props) => {
  return (
    <Grid container className={classes.root}>
      <Grid container alignItems={'center'} item xs={12} sm={12} md={8}>
        <h1>
          how to do something
        </h1>
      </Grid>
      <Grid container justify={'center'} alignItems={'center'} item xs={12} sm={12} md={4}>
        <ControlButtons mode={mode} handleChangeMode={handleChangeMode}/>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(FlowHeader);