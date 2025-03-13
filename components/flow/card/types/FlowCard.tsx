import React, { useState } from 'react';
import { Box, TextField, Typography, Link } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface Props {
  content: string;
  mode: 'edit' | 'preview';
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
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Link
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: 'none' }}
        >
          View Flow
        </Link>
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
        placeholder="https://flow.com/your-flow"
        InputProps={{
          startAdornment: <AccountTreeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default FlowCard; 