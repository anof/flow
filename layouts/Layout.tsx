import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';

const StyledLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      {children}
    </StyledLayout>
  );
};

export default Layout;