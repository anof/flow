import React, {useState} from 'react';
import Layout from '../layouts/Layout';
import {Button, Grid, Theme} from '@material-ui/core';
import {createStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import FlowHeader from '../components/flow/header/FlowHeader';
import FlowCard from '../components/flow/card/FlowCard';
import {modeTypes} from '../customTypes';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingBottom: '1em'
    },
    addButton: {
      [theme.breakpoints.up('md')]: {
        width: '10%',

      },
      [theme.breakpoints.down('md')]: {
        width: '50%'
      },
      marginTop: '2em',

    },
  });

interface cardFields {
  type: string,
  content: string,
  order: number
}

const Home = ({classes}: any) => {
  const [list, setList] = useState([] as any);
  const [mode, setMode] = useState('edit' as modeTypes);


  const renderCards = (list: [cardFields]) => {
    return (
      list.map((el: any, i: number) => {
        return (
          <>
            <FlowCard element={el} key={el.order} mode={mode}/>
            {i === list.length - 1 ? null : <ExpandMoreIcon/>}
          </>
        );
      })
    );
  };

  const handleChangeMode = (mode: modeTypes) => {
    setMode(mode);
  };

  return (
    <Layout>
      <FlowHeader mode={mode} handleChangeMode={handleChangeMode}/>
      <Grid container justify={'center'} spacing={3} className={classes.root}>
        {renderCards(list)}
        <Grid item xs={12}>
          {mode === 'preview' ? null :
            <Button
              variant={'contained'}
              color={'secondary'}
              className={classes.addButton}
              onClick={() => {
                setList((list: [cardFields]) => [...list,
                  {
                    type: 'selectType',
                    content: 'Please input type',
                    order: list.length
                  }
                ]);
              }}
            >
              <AddIcon/>
            </Button>
          }
        </Grid>
      </Grid>
    </Layout>
  );
};


export default withStyles(styles)(Home);
