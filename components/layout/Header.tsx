import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
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
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => router.push('/workflows')}
        >
          Flow
        </Typography>
        {user && (
          <Box>
            <Typography component="span" sx={{ mr: 2 }}>
              {user.name || user.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
