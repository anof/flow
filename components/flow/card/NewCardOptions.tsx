import React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface Props {
  onSelect: (type: string) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: '#fff',
  boxShadow: theme.shadows[3],
}));

const StyledOptionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  textTransform: 'none',
  color: '#000',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const NewCardOptions: React.FC<Props> = ({ onSelect }) => {
  const options = [
    { type: 'image', icon: <ImageIcon sx={{ color: '#2196f3' }} />, label: 'Image' },
    { type: 'link', icon: <LinkIcon sx={{ color: '#4caf50' }} />, label: 'Link' },
    { type: 'text', icon: <TextFieldsIcon sx={{ color: '#ff9800' }} />, label: 'Text' },
    { type: 'flow', icon: <AccountTreeIcon sx={{ color: '#9c27b0' }} />, label: 'Flow' },
  ];

  return (
    <StyledPaper>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={6} key={option.type}>
            <StyledOptionButton
              variant="outlined"
              onClick={() => onSelect(option.type)}
            >
              {option.icon}
              {option.label}
            </StyledOptionButton>
          </Grid>
        ))}
      </Grid>
    </StyledPaper>
  );
};

export default NewCardOptions;