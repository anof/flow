import React, { useState, useRef, useEffect } from 'react';
import { Box, Divider, Grid, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { capitalize } from 'lodash';
import { getBackgroundColor } from '../../../styles/cardsTypesColors';
import ImageCard from './types/ImageCard';
import LinkCard from './types/LinkCard';
import TextCard from './types/TextCard';
import FlowCardType from './types/FlowCard';
import NewCardOptions from './NewCardOptions';
import { Card, CardContent } from '../../../hooks/useFlow';

interface Props {
  element: Card;
  mode: 'edit' | 'preview';
  dragHandleProps?: any;
  onUpdate?: (content: any) => void;
  onDelete?: () => void;
  onTypeChange?: (type: string) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: '1px solid',
  minHeight: '100px',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    width: '60%'
  },
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));

const StyledCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  justifyContent: 'space-between',
});

const StyledHeaderLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const StyledCardNumber = styled(Box)({
  userSelect: 'none',
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: '#f5f5f5',
  fontWeight: 500,
});

const StyledType = styled(Box)({
  userSelect: 'none',
  padding: '4px 12px',
  borderRadius: '4px',
  color: '#fff',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  }
});

const StyledTypeOptions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  marginTop: theme.spacing(2),
  minWidth: '300px',
  '& > div': {
    position: 'static',
    transform: 'none',
    marginBottom: 0,
  },
  '& .MuiPaper-root': {
    width: '100%',
    position: 'static',
    transform: 'none',
    '&::after': {
      display: 'none'
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderBottom: '8px solid #fff',
  }
}));

const StyledContent = styled(Box)({
  padding: '16px',
});

const StyledDragHandle = styled(Box)({
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
});

const FlowCard: React.FC<Props> = ({ element, mode, dragHandleProps, onUpdate, onDelete, onTypeChange }) => {
  const backgroundColor = getBackgroundColor(element.type);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setShowTypeOptions(false);
      }
    };

    if (showTypeOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTypeOptions]);

  const handleTypeSelect = (type: string) => {
    if (onTypeChange) {
      onTypeChange(type);
    }
    setShowTypeOptions(false);
  };

  const renderCardContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <ImageCard
            content={element.content as string}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'link':
        return (
          <LinkCard
            content={element.content as { url: string; name: string }}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'text':
        return (
          <TextCard
            content={element.content as string}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'flow':
        return (
          <FlowCardType
            content={element.content as string}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Grid container item justifyContent="center" xs={12}>
      <StyledPaper elevation={1} style={{ borderColor: backgroundColor }}>
        <Grid container>
          <Grid item xs={12}>
            <StyledCardHeader>
              <StyledHeaderLeft>
                {mode === 'edit' && (
                  <StyledDragHandle {...dragHandleProps}>
                    <IconButton size="small" sx={{ cursor: 'move' }}>
                      <DragIndicatorIcon />
                    </IconButton>
                  </StyledDragHandle>
                )}
                <StyledCardNumber>#{element.order}</StyledCardNumber>
                <Box ref={typeRef} sx={{ position: 'relative' }}>
                  {mode === 'edit' ? (
                    <>
                      <StyledType 
                        style={{ backgroundColor }}
                        onClick={() => setShowTypeOptions(!showTypeOptions)}
                      >
                        {capitalize(element.type)}
                      </StyledType>
                      {showTypeOptions && (
                        <StyledTypeOptions>
                          <NewCardOptions onSelect={handleTypeSelect} />
                        </StyledTypeOptions>
                      )}
                    </>
                  ) : (
                    <StyledType style={{ backgroundColor }}>
                      {capitalize(element.type)}
                    </StyledType>
                  )}
                </Box>
              </StyledHeaderLeft>
              {mode === 'edit' && onDelete && (
                <IconButton 
                  size="small" 
                  onClick={onDelete}
                  sx={{ color: 'error.main' }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </StyledCardHeader>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <StyledContent>
              {renderCardContent()}
            </StyledContent>
          </Grid>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default FlowCard;