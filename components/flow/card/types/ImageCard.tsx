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
          <Box
            component="img"
            src={content}
            alt="Flow card image"
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: 1
            }}
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        py: 2
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {content ? (
        <>
          <Box
            component="img"
            src={content}
            alt="Flow card image"
            sx={{
              maxWidth: '100%',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: 1,
              mb: 2
            }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Change Image
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ p: 3 }}
        >
          Upload Image
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default ImageCard; 