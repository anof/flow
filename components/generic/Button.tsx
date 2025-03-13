import React from 'react';
import { Button as MUIButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(MUIButton)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 2)
}));

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default Button;