import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button, Paper, Divider, Alert, Chip } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { Workflow } from '../../../../types/workflow';
import { useAuth } from '../../../../hooks/useAuth';
import TextCard from './TextCard';
import LinkCard from './LinkCard';
import ImageCard from './ImageCard';
import { default as FlowCardPreview } from './FlowCard';

interface Props {
  content: string;
  mode: 'edit' | 'preview' | 'view';
  onUpdate: (content: string) => void;
}

interface PreviewWorkflow {
  name: string;
  description?: string;
  cards: Array<any>;
}

const getCardColor = (type: string) => {
  switch (type) {
    case 'text':
      return '#4CAF50';
    case 'link':
      return '#2196F3';
    case 'image':
      return '#9C27B0';
    case 'flow':
      return '#FF9800';
    default:
      return '#757575';
  }
};

const FlowCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [previewWorkflow, setPreviewWorkflow] = useState<PreviewWorkflow | null>(null);
  const { user } = useAuth();

  const validateWorkflowId = (id: string) => {
    // Basic validation: non-empty string with no spaces or special characters
    return /^[a-zA-Z0-9]+$/.test(id);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    if (!validateWorkflowId(id)) {
      setError('Please enter a valid workflow ID');
    } else {
      setError(null);
    }
    onUpdate(id);
  };

  const renderCard = (card: any, index: number) => {
    const cardProps = {
      content: card.content,
      mode: 'preview' as const,
      onUpdate: () => {}
    };

    const cardColor = getCardColor(card.type);

    return (
      <Box 
        key={card.id} 
        sx={{ 
          position: 'relative',
          mb: 3,
          '&:last-child': {
            mb: 0
          }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'visible'
          }}
        >
          <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
            <Chip
              label={card.type.charAt(0).toUpperCase() + card.type.slice(1)}
              size="small"
              sx={{
                bgcolor: cardColor,
                color: 'white',
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            />
          </Box>
          <Box sx={{ p: 2, pt: 4 }}>
            {(() => {
              switch (card.type) {
                case 'text':
                  return <TextCard {...cardProps} />;
                case 'link':
                  return <LinkCard {...cardProps} />;
                case 'image':
                  return <ImageCard {...cardProps} />;
                case 'flow':
                  return <FlowCardPreview {...cardProps} />;
                default:
                  return null;
              }
            })()}
          </Box>
        </Paper>
        <Box 
          sx={{ 
            position: 'absolute',
            left: '50%',
            bottom: -24,
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            color: 'text.secondary',
            fontSize: '0.75rem',
            bgcolor: 'background.paper',
            px: 1,
            py: 0.5,
            zIndex: 1
          }}
        >
          {index + 1}
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    const fetchWorkflowPreview = async () => {
      if (!content || mode !== 'preview') {
        setPreviewWorkflow(null);
        return;
      }

      try {
        const workflowRef = doc(db, 'workflows', content);
        const workflowDoc = await getDoc(workflowRef);
        
        if (workflowDoc.exists()) {
          const data = workflowDoc.data() as Workflow;
          // Allow access if workflow is public or user owns it
          if (data.isPublic || data.userId === user?.id) {
            setPreviewWorkflow({
              name: data.name,
              description: data.description,
              cards: data.cards.slice(0, 2)
            });
          } else {
            setPreviewWorkflow(null);
            setError('You do not have access to this workflow');
          }
        } else {
          setPreviewWorkflow(null);
          setError('Workflow not found');
        }
      } catch (error) {
        console.error('Error fetching workflow preview:', error);
        setPreviewWorkflow(null);
        setError('Error loading workflow');
      }
    };

    fetchWorkflowPreview();
  }, [content, mode, user?.id]);

  if (mode === 'preview') {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          py: 3
        }}
      >
        {content ? (
          previewWorkflow ? (
            <Paper 
              elevation={0} 
              sx={{ 
                width: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{previewWorkflow.name}</Typography>
                {previewWorkflow.description && (
                  <Typography variant="body2" color="text.secondary">
                    {previewWorkflow.description}
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                {previewWorkflow.cards.length > 0 ? (
                  <>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        position: 'relative',
                        '& > *': {
                          position: 'relative'
                        }
                      }}
                    >
                      {previewWorkflow.cards.map((card, index) => renderCard(card, index))}
                    </Box>
                    <Alert 
                      severity="info" 
                      sx={{ 
                        mt: 4,
                        '& .MuiAlert-message': {
                          width: '100%',
                          textAlign: 'center'
                        }
                      }}
                    >
                      {previewWorkflow.cards.length > 2 
                        ? `This workflow contains ${previewWorkflow.cards.length} cards. Click "View Full Workflow" to see all cards.`
                        : 'Click "View Full Workflow" to see the complete workflow.'}
                    </Alert>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    This workflow has no cards yet
                  </Typography>
                )}
              </Box>
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'background.paper',
                  display: 'flex',
                  justifyContent: 'center',
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Button
                  href={`${window.location.origin}/workflows/${content}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    bgcolor: 'grey.300',
                    color: 'text.primary',
                    boxShadow: 1,
                    '&:hover': {
                      bgcolor: 'grey.400'
                    }
                  }}
                  endIcon={<OpenInNewIcon />}
                >
                  View Full Workflow
                </Button>
              </Box>
            </Paper>
          ) : error ? (
            <Box sx={{ textAlign: 'center' }}>
              <AccountTreeIcon sx={{ fontSize: 40, color: 'error.main' }} />
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <AccountTreeIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Loading workflow preview...
              </Typography>
            </Box>
          )
        ) : (
          <>
            <AccountTreeIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary" align="center">
              No Flow link added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Switch to edit mode to add a Flow link
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        label="Workflow ID"
        value={content || ''}
        onChange={handleIdChange}
        error={!!error}
        helperText={error || "Enter the workflow ID (e.g., iplbMCBuQ9q2zh4pY64D)"}
        placeholder="Enter workflow ID"
        InputProps={{
          startAdornment: <AccountTreeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default FlowCard; 