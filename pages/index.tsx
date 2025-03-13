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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
  const [list, setList] = useState([{
    type: 'text',
    content: 'content for the first step that is very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long',
    order: 1
  },
    {
      type: 'flow',
      content: 'this is a flow',
      order: 2
    },
    {
      type: 'link',
      content: 'http://www.google.com',
      order: 3
    },
    {
      type: 'image',
      content: 'Image here',
      order: 4
    }
  ] as any);
  const [mode, setMode] = useState('edit' as modeTypes);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(list) as cardFields[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedItems = items.map((item: cardFields, index) => ({
      ...item,
      order: index + 1
    }));

    setList(updatedItems);
  };

  const renderCards = (list: [cardFields]) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {list.map((el: any, i: number) => (
                <Draggable
                  key={el.order}
                  draggableId={el.order.toString()}
                  index={i}
                  isDragDisabled={mode !== 'edit'}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        width: '100%',
                        marginBottom: '1em'
                      }}
                    >
                      <FlowCard element={el} mode={mode} />
                      {i === list.length - 1 ? null : <ExpandMoreIcon />}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  const handleChangeMode = (mode: modeTypes) => {
    setMode(mode);
  };

  /**
   * Handles adding new card, by adding new item to list with type SelectType
   * and letting FlowCard component handle logic
   */
  const handleAddNewCard = () => {
    setList((list: [cardFields]) => [...list,
      {
        type: 'Select Type',
        content: '',
        order: list.length + 1
      }
    ]);
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
              onClick={handleAddNewCard}
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
