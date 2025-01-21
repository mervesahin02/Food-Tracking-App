import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import '../styles/SideMenu.css'; // Yeni eklenen CSS dosyasını ekliyoruz

function SideMenu({ isAuthenticated, handleLogout }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Menüde gösterilecek öğeler
    const menuItems = isAuthenticated
        ? [
            { text: 'Profil Bilgisi', icon: <AccountCircleIcon />, action: () => navigate('/profile') },
            { text: 'Ayarlar', icon: <SettingsIcon />, action: () => navigate('/settings') },
            { text: 'Çıkış Yap', icon: <LogoutIcon />, action: handleLogout },
        ]
        : [
            { text: 'Giriş Yap', icon: <AccountCircleIcon />, action: () => navigate('/login') },
            { text: 'Kayıt Ol', icon: <SettingsIcon />, action: () => navigate('/register') },
        ];

    const toggleDrawer = (state) => () => setOpen(state);

    return (
        <>
            {/* Menü butonu */}
            <IconButton className="menu-button" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>

            {/* Drawer (Sol Menü) */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                classes={{ paper: 'custom-drawer' }}
            >
                <div className="menu-header">
                    <Typography variant="h6" className="menu-title">
                        Menü
                    </Typography>
                </div>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            className="menu-item"
                            onClick={() => {
                                item.action();
                                setOpen(false); // Menü kapanır
                            }}
                        >
                            <ListItemIcon className="menu-icon">{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} className="menu-text" />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography variant="body2" className="menu-footer">
                    © 2025 Beslenme Takip
                </Typography>
            </Drawer>
        </>
    );
}

export default SideMenu;
