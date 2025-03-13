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
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </Typography>
        ) : (
          <>
            <TextFieldsIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary" align="center">
              No text content yet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Switch to edit mode to add your text
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
        multiline
        rows={4}
        value={content}
        onChange={(e) => onUpdate(e.target.value)}
        placeholder="Write your thoughts, notes, or any text content here..."
        InputProps={{
          startAdornment: <TextFieldsIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
      />
    </Box>
  );
};

export default TextCard; 