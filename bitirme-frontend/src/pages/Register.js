import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';

function Register() {
    const [formData, setFormData] = useState({
        adSoyad: '',
        email: '',  // E-posta alanı eklendi
        yas: '',
        kilo: '',
        boy: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/kullanici/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // HTTP 2xx durum kodları başarılı
                const responseBody = await response.text();
                setSuccess(responseBody || 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
                setError(null);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const responseBody = await response.text();
                setError(responseBody || 'Sunucu bir hata döndü.');
                setSuccess(null);
            }
        } catch (err) {
            console.error('Hata Detayı:', err);
            setError('Sunucuyla bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin.');
            setSuccess(null);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    border: '1px solid #ddd',
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Kayıt Ol
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Ad Soyad"
                        name="adSoyad"
                        value={formData.adSoyad}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Yaş"
                        name="yas"
                        type="number"
                        value={formData.yas}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Kilo (kg)"
                        name="kilo"
                        type="number"
                        value={formData.kilo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Boy (cm)"
                        name="boy"
                        type="number"
                        value={formData.boy}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Şifre"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Kayıt Ol
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register;
