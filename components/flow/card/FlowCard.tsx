import React, {Fragment} from 'react';
import {Grid, Paper, Theme, withStyles} from '@material-ui/core';
import clsx from 'clsx';
import {createStyles} from '@material-ui/styles';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid',
      minHeight: '5em',
      [theme.breakpoints.up('md')]: {
        width: '30%'

      },
      [theme.breakpoints.down('md')]: {
        minWidth: '80%'
      },
      backgroundColor: theme.palette.primary.light,
      padding: '2em 0.5em 2em 0.5em',
    },
    linkCard: {
      userSelect: 'none',
      borderColor: theme.palette.info.main,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.secondary.contrastText,
      }
    },
    imageCard: {
      border: '0px',
      cursor: 'pointer',
    },
    flowCard: {
      borderColor: theme.palette.warning.main,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.secondary.contrastText,
      }
    }
  });


const FlowCard = ({classes, element}: any) => {
  return (
    <Grid container item justify={'center'} xs={12}>
      <Paper
        elevation={5}
        className={
          clsx(
            classes.paper,
            element.type === 'link' ?
              classes.linkCard
              :
              element.type === 'image' ?
                classes.imageCard
                : element.type === 'flow' ?
                classes.flowCard :
                null
          )
        }
      >
        {element.content}
      </Paper>
    </Grid>
  );
};


export default withStyles(styles)(FlowCard);