import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Button, Theme } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useFlow } from '../../hooks/useFlow';
import Layout from '../../layouts/Layout';
import FlowCard from '../../components/flow/card/FlowCard';
import NewCardOptions from '../../components/flow/card/NewCardOptions';
import ControlButtons from '../../components/flow/header/ControlButtons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { modeTypes } from '../../customTypes';
import { Card } from '../../types/workflow';

const WorkflowPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = React.useState<modeTypes>('edit');
  const [showOptions, setShowOptions] = React.useState(false);
  const optionsRef = React.useRef<HTMLDivElement>(null);
  const { workflow, loading: workflowLoading, addCard, updateCard, deleteCard, updateCardOrder, updateWorkflow } = useFlow(id as string);

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

  const onDragEnd = async (result: any) => {
    if (!result.destination || !workflow) return;

    const items = Array.from(workflow.cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers for all cards
    const updatedItems = items.map((card, index) => ({
      ...card,
      order: index + 1
    }));

    await updateCardOrder(updatedItems);
  };

  const handleAddNewCard = async (type: string) => {
    await addCard(type);
    setShowOptions(false);
  };

  const handleCardUpdate = async (id: string, newContent: any) => {
    if (!workflow) return;

    const cardToUpdate = workflow.cards.find(card => card.id === id);
    if (!cardToUpdate) return;

    await updateCard(id, { type: cardToUpdate.type, content: newContent });
  };

  const handleDeleteCard = async (id: string) => {
    await deleteCard(id);
  };

  const handleCardTypeChange = async (id: string, newType: string) => {
    if (!workflow) return;

    const cardToUpdate = workflow.cards.find(card => card.id === id);
    if (!cardToUpdate) return;

    const newCard: Card = {
      ...cardToUpdate,
      type: newType,
      content: newType === 'link' 
        ? { url: '', name: '' }
        : newType === 'flow'
        ? ''
        : newType === 'text'
        ? ''
        : newType === 'image'
        ? ''
        : ''
    };

    await updateCard(id, { type: newType, content: newCard.content });
  };

  const handleShare = async () => {
    if (!workflow) return;
    
    try {
      const newIsPublic = !workflow.isPublic;
      await updateWorkflow({ isPublic: newIsPublic });
      
      if (newIsPublic) {
        const shareUrl = `${window.location.origin}/workflows/${workflow.id}`;
        await navigator.clipboard.writeText(shareUrl);
        // You might want to show a success message here
      }
    } catch (error) {
      console.error('Error sharing workflow:', error);
    }
  };

  if (workflowLoading || authLoading) {
    return (
      <Layout>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Layout>
    );
  }

  if (!workflow) {
    return (
      <Layout>
        <Container>
          <Typography>Workflow not found</Typography>
        </Container>
      </Layout>
    );
  }

  // If the workflow is not public and the user is not the owner, show access denied message
  if (!workflow.isPublic && (!user || workflow.userId !== user.id)) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="60vh"
            textAlign="center"
          >
            <LockIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Access Denied
            </Typography>
            <Typography color="text.secondary" paragraph>
              This workflow is private and can only be accessed by its owner.
            </Typography>
            {!user ? (
              <Button 
                variant="contained" 
                onClick={() => router.push('/login')}
                sx={{ mt: 2 }}
              >
                Login to Access
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={() => router.push('/workflows')}
                sx={{ mt: 2 }}
              >
                Go to My Workflows
              </Button>
            )}
          </Box>
        </Container>
      </Layout>
    );
  }

  // If the user is not the owner, force preview mode
  const isOwner = user && workflow.userId === user.id;
  const effectiveMode = isOwner ? mode : 'preview';

  console.log('Debug workflow page:', {
    isOwner,
    userId: user?.id,
    workflowUserId: workflow.userId,
    mode,
    effectiveMode,
    isPublic: workflow.isPublic
  });

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            {workflow.name}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {isOwner && (
              <Button
                variant="contained"
                color="primary"
                startIcon={workflow.isPublic ? <PublicIcon /> : <LockIcon />}
                onClick={handleShare}
                sx={{ 
                  minWidth: '120px',
                  backgroundColor: workflow.isPublic ? 'success.main' : 'primary.main',
                  '&:hover': {
                    backgroundColor: workflow.isPublic ? 'success.dark' : 'primary.dark'
                  }
                }}
              >
                {workflow.isPublic ? 'Public' : 'Private'}
              </Button>
            )}
            {isOwner && (
              <Box sx={{ ml: 2 }}>
                <ControlButtons mode={mode} setMode={setMode} />
              </Box>
            )}
          </Box>
        </Box>

        {workflow.description && (
          <Typography color="text.secondary" paragraph>
            {workflow.description}
          </Typography>
        )}

        <Box sx={{ mt: 4, mb: 12 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {workflow.cards.map((element, index) => (
                    <Draggable
                      key={element.id || `card-${index}`}
                      draggableId={element.id || `card-${index}`}
                      index={index}
                      isDragDisabled={effectiveMode !== 'edit'}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{ mb: 2 }}
                        >
                          <FlowCard 
                            element={{...element, id: element.id || `card-${index}`}}
                            mode={effectiveMode} 
                            dragHandleProps={provided.dragHandleProps}
                            onUpdate={(newContent) => handleCardUpdate(element.id!, newContent)}
                            onDelete={() => handleDeleteCard(element.id!)}
                            onTypeChange={(newType) => handleCardTypeChange(element.id!, newType)}
                          />
                          {index < workflow.cards.length - 1 && (
                            <Box display="flex" justifyContent="center" width="100%" sx={{ mt: 1, mb: 1 }}>
                              <ExpandMoreIcon sx={{ color: 'text.secondary' }} />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        {effectiveMode === 'edit' && (
          <Box
            sx={{
              position: 'fixed',
              bottom: '2em',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '600px',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div ref={optionsRef}>
              {showOptions ? (
                <NewCardOptions onSelect={handleAddNewCard} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowOptions(true)}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    width: '200px',
                    [`${(theme: Theme) => theme.breakpoints.up('md')}`]: {
                      width: '200px',
                    },
                    [`${(theme: Theme) => theme.breakpoints.down('md')}`]: {
                      width: '200px'
                    }
                  }}
                >
                  Add card
                </Button>
              )}
            </div>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default WorkflowPage; 