import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Flow
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
