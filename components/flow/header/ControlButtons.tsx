import React, {useState} from 'react';
import {Button, ButtonGroup} from '@material-ui/core';
import {colorProps} from '../../../customTypes';

const getColor = (buttonValue: string, selectedButton: string): colorProps => {
  if (selectedButton === buttonValue)
    return 'primary';
  else
    return undefined;
};


const ControlButtons = ({mode, handleChangeMode}: any) => {
  return (
    <ButtonGroup>
      <Button
        variant={'contained'}
        color={getColor('edit', mode)}
        onClick={() => handleChangeMode('edit')}
      >
        Edit
      </Button>
      <Button
        variant={'contained'}
        onClick={() => handleChangeMode('preview')}
        color={getColor('preview', mode)}
      >
        Preview
      </Button>
    </ButtonGroup>
  );
};

export default ControlButtons;