import React from 'react';
import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getBackgroundColor } from '../../../styles/cardsTypesColors';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: '100px',
  margin: '4px',
}));

interface Props {
  onSelect: (type: string) => void;
}

const cardTypes = ['text', 'link', 'image', 'flow'];

export const NewCardOptions: React.FC<Props> = ({ onSelect }) => {
  return (
    <Grid container justifyContent="center" spacing={1}>
      {cardTypes.map((type) => (
        <Grid item key={type}>
          <StyledButton
            variant="contained"
            onClick={() => onSelect(type)}
            style={{
              backgroundColor: getBackgroundColor(type),
              color: '#fff'
            }}
          >
            {type}
          </StyledButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewCardOptions;