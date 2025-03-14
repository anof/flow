import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={() => router.push('/workflows')}
          >
            Flow
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography 
                component="span" 
                sx={{ 
                  color: 'text.primary',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                {user.name || user.email}
              </Typography>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
