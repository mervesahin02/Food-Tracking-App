import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import SideMenu from './SideMenu'; // Yan Menü
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';  // CSS dosyasını import edin

function Navbar({ isAuthenticated, setAuthToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthToken(false); // Kullanıcı oturumunu kapat
        navigate('/login'); // Login sayfasına yönlendir
    };

    const handleHomeRedirect = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    };

    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <SideMenu isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

                {/* Başlık */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
                    Beslenme Takip
                </Typography>

                {/* Anasayfa Butonu */}
                <Button color="inherit" onClick={handleHomeRedirect} sx={{ marginRight: 2 }}>
                    Anasayfa
                </Button>

                {/* İletişim Butonu */}
                <Button color="inherit" onClick={() => navigate('/contact')} sx={{ marginRight: 2 }}>
                    İletişim
                </Button>

                {/* Giriş / Çıkış Butonları */}
                <Box>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Çıkış Yap
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Giriş Yap
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
