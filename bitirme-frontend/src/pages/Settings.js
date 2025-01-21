import React from 'react';
import { useUser } from '../context/UserContext'; // UserContext'ten alıyoruz
import { Button, Typography, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

function Settings() {
    const { language, changeLanguage, theme, toggleTheme } = useUser(); // Context'ten dil ve tema bilgisi alınıyor

    const handleLanguageChange = (event) => {
        changeLanguage(event.target.value); // Dil değiştiriliyor
    };

    const handleThemeChange = () => {
        toggleTheme(); // Tema değiştiriliyor
    };

    return (
        <Box sx={{ padding: '40px', backgroundColor: theme === 'light' ? '#f5f5f5' : '#333', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>Ayarlar</Typography>

            {/* Dil Seçenekleri */}
            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel id="language-label">Dil Seçin</InputLabel>
                <Select
                    labelId="language-label"
                    value={language}
                    onChange={handleLanguageChange}
                    label="Dil Seçin"
                >
                    <MenuItem value="tr">Türkçe</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                </Select>
            </FormControl>

            {/* Tema Seçenekleri */}
            <Button
                variant="contained"
                onClick={handleThemeChange}
                sx={{ backgroundColor: theme === 'light' ? '#1976d2' : '#333', color: '#fff' }}
            >
                {theme === 'light' ? 'Koyu Modu Seç' : 'Aydınlık Modu Seç'}
            </Button>
        </Box>
    );
}

export default Settings;
