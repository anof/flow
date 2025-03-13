import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';

interface Props {
  content: string;
  mode: 'edit' | 'preview';
  onUpdate: (content: string) => void;
}

const TextCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  if (mode === 'preview') {
    return (
      <Box sx={{ width: '100%', p: 2 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Enter your text here..."
        InputProps={{
          startAdornment: <TextFieldsIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default TextCard; 