import React, { useState, useEffect, useRef } from 'react';
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
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('md')]: {
    width: '200px'
  }
}));

const StyledOptionsContainer = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  bottom: '2em',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '600px',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
}));

type CardContent = string | { url: string; name: string };

interface Card {
  type: string;
  content: CardContent;
  order: number;
}

const Home = () => {
  const [mode, setMode] = useState<modeTypes>('edit');
  const [showOptions, setShowOptions] = useState(false);
  const [list, setList] = useState<Card[]>([
    {
      type: 'link',
      content: { url: 'https://example.com', name: 'Example Link' },
      order: 1
    },
    {
      type: 'image',
      content: '',
      order: 2
    }
  ]);
  const [isClient, setIsClient] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

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
    const initialContent: CardContent = type === 'link' 
      ? { url: '', name: '' }
      : '';

    setList(list => [...list,
      {
        type,
        content: initialContent,
        order: list.length + 1
      }
    ]);
    setShowOptions(false);
  };

  const handleCardUpdate = (order: number, newContent: CardContent) => {
    setList(list => list.map(item => 
      item.order === order 
        ? { ...item, content: newContent }
        : item
    ));
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
                            onUpdate={(newContent) => handleCardUpdate(element.order, newContent)}
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
            <div ref={optionsRef}>
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
            </div>
          </StyledOptionsContainer>
        )}
      </StyledRoot>
    </Layout>
  );
};

export default Home;
