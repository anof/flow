import React, { useState } from 'react';
import { Box, TextField, Typography, Link } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Props {
  content: string;
  mode: 'edit' | 'preview' | 'view';
  onUpdate: (content: string) => void;
}

const FlowCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);

  const validateFlowUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'flow.com';
    } catch {
      return false;
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    if (!validateFlowUrl(url)) {
      setError('Please enter a valid Flow URL (https://flow.com/*)');
    } else {
      setError(null);
    }
    onUpdate(url);
  };

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
          <Link
            href={content}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              textDecoration: 'none',
              color: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            View Flow
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </Link>
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
        placeholder="Enter your Flow URL (e.g., https://flow.com/your-flow-name)"
        InputProps={{
          startAdornment: <AccountTreeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default FlowCard; 