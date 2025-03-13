import React from 'react';
import { Box, Divider, Grid, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { capitalize } from 'lodash';
import { getBackgroundColor } from '../../../styles/cardsTypesColors';
import ImageCard from './types/ImageCard';
import LinkCard from './types/LinkCard';
import TextCard from './types/TextCard';
import FlowCardType from './types/FlowCard';

interface Props {
  element: {
    type: string;
    content: any;
    order: number;
  };
  mode: 'edit' | 'preview';
  dragHandleProps?: any;
  onUpdate?: (content: any) => void;
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

const StyledType = styled(Box)({
  userSelect: 'none',
  padding: '4px 12px',
  borderRadius: '4px',
  color: '#fff',
  fontWeight: 500,
});

const StyledContent = styled(Box)({
  padding: '16px',
});

const StyledDragHandle = styled(Box)({
  cursor: 'move',
  display: 'flex',
  alignItems: 'center',
});

const FlowCard: React.FC<Props> = ({ element, mode, dragHandleProps, onUpdate }) => {
  const backgroundColor = getBackgroundColor(element.type);
  
  const renderCardContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <ImageCard
            content={element.content}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'link':
        return (
          <LinkCard
            content={element.content || { url: '', name: '' }}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'text':
        return (
          <TextCard
            content={element.content || ''}
            mode={mode}
            onUpdate={onUpdate || (() => {})}
          />
        );
      case 'flow':
        return (
          <FlowCardType
            content={element.content || ''}
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
              {mode === 'edit' && (
                <StyledDragHandle {...dragHandleProps}>
                  <IconButton size="small" sx={{ cursor: 'move' }}>
                    <DragIndicatorIcon />
                  </IconButton>
                </StyledDragHandle>
              )}
              <StyledType style={{ backgroundColor }}>
                {capitalize(element.type)}
              </StyledType>
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