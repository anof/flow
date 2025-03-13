import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { modeTypes } from '../../../customTypes';

interface Props {
  mode: modeTypes;
  setMode: (mode: modeTypes) => void;
}

const StyledButtonGroup = styled(ButtonGroup)({
  '& .MuiButton-root': {
    minWidth: '80px',
    padding: '4px 12px',
    fontSize: '0.875rem',
  }
});

const getColor = (buttonMode: modeTypes, currentMode: modeTypes) => {
  return buttonMode === currentMode ? 'primary' : 'inherit';
};

const ControlButtons: React.FC<Props> = ({ mode, setMode }) => {
  return (
    <StyledButtonGroup variant="contained" size="small">
      <Button
        color={getColor('preview', mode)}
        onClick={() => setMode('preview')}
      >
        Preview
      </Button>
      <Button
        color={getColor('edit', mode)}
        onClick={() => setMode('edit')}
      >
        Edit
      </Button>
    </StyledButtonGroup>
  );
};

export default ControlButtons;