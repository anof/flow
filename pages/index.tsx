import React, { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlowCard from '../components/flow/card/FlowCard';
import NewCardOptions from '../components/flow/card/NewCardOptions';
import ControlButtons from '../components/flow/header/ControlButtons';
import { modeTypes } from '../customTypes';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StyledRoot = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: '2em',
  paddingBottom: '5em',
  position: 'relative',
}));

const StyledAddButton = styled(Button)(({ theme }) => ({
  marginTop: '1em',
  [theme.breakpoints.up('md')]: {
    width: '10%',
  },
  [theme.breakpoints.down('md')]: {
    width: '50%'
  }
}));

const StyledOptionsContainer = styled(Grid)({
  position: 'absolute',
  bottom: '2em',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
});

const Home = () => {
  const [mode, setMode] = useState<modeTypes>('edit');
  const [showOptions, setShowOptions] = useState(false);
  const [list, setList] = useState([
    {
      type: 'link',
      content: 'First card',
      order: 1
    },
    {
      type: 'image',
      content: 'Second card',
      order: 2
    }
  ]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setList(updatedItems);
  };

  const handleAddNewCard = (type: string) => {
    setList(list => [...list,
      {
        type,
        content: '',
        order: list.length + 1
      }
    ]);
    setShowOptions(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Layout>
      <StyledRoot container>
        <Grid container justifyContent="flex-end" sx={{ mb: 2, pr: 2 }}>
          <ControlButtons mode={mode} setMode={setMode} />
        </Grid>

        <Grid container spacing={1}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Grid container spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                  {list.map((element, index) => (
                    <Draggable
                      key={element.order}
                      draggableId={element.order.toString()}
                      index={index}
                      isDragDisabled={mode !== 'edit'}
                    >
                      {(provided) => (
                        <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps}>
                          <FlowCard 
                            element={element} 
                            mode={mode} 
                            dragHandleProps={provided.dragHandleProps}
                          />
                          <ExpandMoreIcon sx={{ mt: 1, color: 'text.secondary' }} />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>

        {mode === 'edit' && (
          <StyledOptionsContainer>
            {showOptions ? (
              <NewCardOptions onSelect={handleAddNewCard} />
            ) : (
              <StyledAddButton
                variant="contained"
                color="primary"
                onClick={() => setShowOptions(true)}
                endIcon={<ExpandMoreIcon />}
              >
                Add card
              </StyledAddButton>
            )}
          </StyledOptionsContainer>
        )}
      </StyledRoot>
    </Layout>
  );
};

export default Home;
