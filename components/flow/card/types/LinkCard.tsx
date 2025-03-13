import React, { useState } from 'react';
import { Box, TextField, Typography, Link } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

interface Props {
  content: {
    url: string;
    name: string;
  };
  mode: 'edit' | 'preview';
  onUpdate: (content: { url: string; name: string }) => void;
}

const LinkCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (http:// or https://)');
    } else {
      setError(null);
    }
    onUpdate({ ...content, url });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...content, name: event.target.value });
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
        {content.url ? (
          <Link
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              textDecoration: 'none',
              color: '#1976d2',
              '&:hover': {
                textDecoration: 'underline',
              }
            }}
          >
            {content.name || content.url}
          </Link>
        ) : (
          <>
            <LinkOffIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary" align="center">
              No link added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Switch to edit mode to add a link
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="URL"
        value={content.url}
        onChange={handleUrlChange}
        error={!!error}
        helperText={error}
        placeholder="https://example.com"
        InputProps={{
          startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
      <TextField
        fullWidth
        label="Display Name (optional)"
        value={content.name}
        onChange={handleNameChange}
        placeholder="Click here to visit..."
      />
    </Box>
  );
};

export default LinkCard; 