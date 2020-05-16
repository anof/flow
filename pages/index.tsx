import React from 'react';
import Layout from '../layouts/Layout';
import {Button, Grid, Paper} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';
import FlexGrid from '../components/generic/FlexGrid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: any) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    paper: {
      // border: '2px solid',
      // borderColor: theme.palette.info.main,
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
    addButton: {
      [theme.breakpoints.up('md')]: {
        width: '10%',

      },
      [theme.breakpoints.down('md')]: {
        width: '50%'
      },
      marginTop: '2em',

    }
  });

const renderCards = (list: any, classes: any) => {
  return (
    list.map((el: any, i: number) => {
      return (
        <>
          <FlexGrid key={el.order} justify={'center'} item xs={12}>
            <Paper elevation={5} className={classes.paper}>
              {el.content}
            </Paper>
          </FlexGrid>
          {i === list.length - 1 ? null : <ExpandMoreIcon/>}
        </>
      );
    })
  );
};

const Home = ({classes, theme}: any) => {
  const list = [
    {
      type: 'text',
      content: 'content for the first step that is very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long',
      order: 1
    },
    {
      type: 'text',
      content: 'hello',
      order: 2
    },
    {
      type: 'link',
      content: 'http://www.google.com',
      order: 3
    }
  ];
  return (
    <Layout>
      <Grid container justify={'center'} spacing={3} className={classes.root}>
        {renderCards(list, classes)}
        <Button
          variant={'contained'}
          color={'secondary'}
          className={classes.addButton}
        >
          <AddIcon/>
        </Button>
      </Grid>
    </Layout>
  );
};


export default withStyles(styles, {withTheme: true})(Home);
