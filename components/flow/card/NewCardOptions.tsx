import React, { useEffect, useRef, useState } from 'react';
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
  backgroundColor: '#fff',
  boxShadow: theme.shadows[3],
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  marginBottom: theme.spacing(2),
  zIndex: 1000,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: '8px solid #fff',
  }
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
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;
        
        // If there's more space below than above, show below
        setPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
      }
    };

    checkPosition();
    window.addEventListener('resize', checkPosition);
    return () => window.removeEventListener('resize', checkPosition);
  }, []);

  const options = [
    { type: 'image', icon: <ImageIcon sx={{ color: '#2196f3' }} />, label: 'Image' },
    { type: 'link', icon: <LinkIcon sx={{ color: '#4caf50' }} />, label: 'Link' },
    { type: 'text', icon: <TextFieldsIcon sx={{ color: '#ff9800' }} />, label: 'Text' },
    { type: 'flow', icon: <AccountTreeIcon sx={{ color: '#9c27b0' }} />, label: 'Flow' },
  ];

  return (
    <Box ref={containerRef}>
      <StyledPaper sx={{
        bottom: position === 'top' ? '100%' : 'auto',
        top: position === 'bottom' ? '100%' : 'auto',
        marginBottom: position === 'top' ? theme => theme.spacing(2) : 0,
        marginTop: position === 'bottom' ? theme => theme.spacing(2) : 0,
        '&::after': {
          ...(position === 'top' ? {
            bottom: '-8px',
            borderTop: '8px solid #fff',
          } : {
            top: '-8px',
            borderBottom: '8px solid #fff',
          })
        }
      }}>
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
    </Box>
  );
};

export default NewCardOptions;