import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Link, Paper, Divider } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { Workflow } from '../../../../types/workflow';

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

const FlowCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const [previewWorkflow, setPreviewWorkflow] = useState<PreviewWorkflow | null>(null);

  const validateFlowUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'flow-a5317.web.app' && parsedUrl.pathname.startsWith('/workflow/');
    } catch {
      return false;
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    if (!validateFlowUrl(url)) {
      setError('Please enter a valid Flow URL (https://flow-a5317.web.app/workflow/*)');
    } else {
      setError(null);
    }
    onUpdate(url);
  };

  useEffect(() => {
    const fetchWorkflowPreview = async () => {
      if (!content || mode !== 'preview') return;

      try {
        const url = new URL(content);
        const workflowId = url.pathname.split('/').pop();
        if (!workflowId) return;

        const workflowRef = doc(db, 'workflows', workflowId);
        const workflowDoc = await getDoc(workflowRef);
        
        if (workflowDoc.exists() && workflowDoc.data().isPublic) {
          const data = workflowDoc.data() as Workflow;
          setPreviewWorkflow({
            name: data.name,
            description: data.description,
            cards: data.cards.slice(0, 2) // Only get first 2 cards
          });
        }
      } catch (error) {
        console.error('Error fetching workflow preview:', error);
      }
    };

    fetchWorkflowPreview();
  }, [content, mode]);

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
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Preview of first {Math.min(previewWorkflow.cards.length, 2)} cards:
                    </Typography>
                    {previewWorkflow.cards.map((card, index) => (
                      <Box key={index} sx={{ mb: 1 }}>
                        <Typography variant="body2">
                          {index + 1}. {card.type.charAt(0).toUpperCase() + card.type.slice(1)} card
                        </Typography>
                      </Box>
                    ))}
                    {previewWorkflow.cards.length > 2 && (
                      <Typography variant="body2" color="text.secondary">
                        ... and {previewWorkflow.cards.length - 2} more cards
                      </Typography>
                    )}
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
                  bgcolor: 'action.hover',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Link
                  href={content}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    textDecoration: 'none',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  View Full Workflow
                  <OpenInNewIcon sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            </Paper>
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
        label="Flow URL"
        value={content}
        onChange={handleUrlChange}
        error={!!error}
        helperText={error}
        placeholder="Enter your Flow URL (e.g., https://flow-a5317.web.app/workflow/your-flow-id)"
        InputProps={{
          startAdornment: <AccountTreeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default FlowCard; 