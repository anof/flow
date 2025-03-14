import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Header from '../components/layout/Header';
import { useAuth } from '../hooks/useAuth';

const StyledLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <StyledLayout>
      {user && <Header />}
      {children}
    </StyledLayout>
  );
};

export default Layout;