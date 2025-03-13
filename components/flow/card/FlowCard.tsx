import React from 'react';
import { Box, Divider, Grid, IconButton, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { capitalize } from 'lodash';
import { getBackgroundColor } from '../../../styles/cardsTypesColors';

interface Props {
  element: {
    type: string;
    content: string;
    order: number;
  };
  mode: 'edit' | 'preview';
  dragHandleProps?: any;
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

const FlowCard: React.FC<Props> = ({ element, mode, dragHandleProps }) => {
  const backgroundColor = getBackgroundColor(element.type);
  
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
              {element.content}
            </StyledContent>
          </Grid>
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default FlowCard;