import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

interface Props {
  content: string;
  mode: 'edit' | 'preview' | 'view';
  onUpdate: (content: string) => void;
}

const ImageCard: React.FC<Props> = ({ content, mode, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <img 
            src={content} 
            alt="Flow card image" 
            style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
          />
        ) : (
          <>
            <ImageNotSupportedIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body1" color="text.secondary" align="center">
              Image not uploaded yet
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Switch to edit mode to add an image
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '200px',
        border: '2px dashed #ccc',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 2,
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      
      {content ? (
        <>
          <img 
            src={content} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
          />
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Replace Image
          </Button>
        </>
      ) : (
        <>
          <ImageIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography variant="body1" color="text.secondary">
            Drag and drop an image here or
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageCard; 