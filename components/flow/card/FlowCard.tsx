import React from 'react';
import {Box, Divider, Grid, IconButton, Paper, Theme, withStyles} from '@material-ui/core';
import clsx from 'clsx';
import {createStyles} from '@material-ui/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import {capitalize} from 'lodash';
import {getBackgroundColor} from '../../../styles/cardsTypesColors';
import {cardsTypes} from '../../../utils/cards/cardsTypes';
import {NewCardOptions} from './NewCardOptions';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      border: '1px solid',
      minHeight: '5em',
      [theme.breakpoints.up('md')]: {
        width: '40%'

      },
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      backgroundColor: theme.palette.primary.light,
    },
    cardHeader: {
      padding: '0.3em 0.5em 0.3em 0.5em',
    },
    circle: {
      userSelect: 'none',
      minWidth: '1.5em',
      color: theme.palette.secondary.contrastText,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    type: {
      userSelect: 'none',
      color: theme.palette.secondary.contrastText,
      padding: '0.2em 0.5em 0.2em 0.5em',
      borderRadius: '3px',
    },
    content: {
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
      userSelect: 'none',
      cursor: 'pointer',
      borderColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.secondary.contrastText,
      }
    },
    flowCard: {
      userSelect: 'none',
      borderColor: theme.palette.warning.main,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.secondary.contrastText,
      }
    }
  });


const FlowCard = ({classes, element, mode}: any) => {
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
        <Grid container>
          <Grid item container xs={12} justify={'space-between'} className={classes.cardHeader}>
            <Box
              borderRadius="50%"
              className={classes.circle}
              style={{backgroundColor: getBackgroundColor(element.type)}}>
              {element.order}
            </Box>
            <Box
              className={classes.type}
              style={{backgroundColor: getBackgroundColor(element.type)}}>
              {capitalize(element.type)}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          <Grid item xs={2}/>
          <Grid item xs={mode === 'edit' ? 8 : 12} className={classes.content}>
            {
              element.type === cardsTypes.selectType?
                NewCardOptions()
                :
              element.content
            }
          </Grid>
          {mode !== 'edit' ? null :
            <Grid
              container item xs={2}
              alignItems={'center'}
              justify={'flex-end'}>
              <IconButton>
                <DragIndicatorIcon/>
              </IconButton>
            </Grid>
          }
        </Grid>
      </Paper>
    </Grid>
  );
};


export default withStyles(styles, {withTheme: true})(FlowCard);