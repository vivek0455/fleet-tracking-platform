import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const Layout = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar
                position="static"
                sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        🚚 Fleet Tracking Platform
                    </Typography>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/admin"
                        sx={{
                            mx: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            }
                        }}
                    >
                        Admin
                    </Button>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/driver"
                        sx={{
                            mx: 1,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            }
                        }}
                    >
                        Driver
                    </Button>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth="xl"
                sx={{
                    flex: 1,
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 3,
                        p: 3,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

export default Layout;
