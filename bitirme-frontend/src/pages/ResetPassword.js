import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { updatePassword } from '../services/api';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Snackbar,
} from '@mui/material';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // URL'den token'i al
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Geçersiz veya eksik şifre sıfırlama bağlantısı.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Şifreler eşleşmiyor!');
            return;
        }

        try {
            await updatePassword(token, newPassword);
            setSuccess('Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.');
            setSnackbarOpen(true);
        } catch (err) {
            setError('Şifre sıfırlama işlemi başarısız. Lütfen tekrar deneyin.');
        }
    };

    const handleCloseSnackbar = () => setSnackbarOpen(false);

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
                <Typography variant="h5" gutterBottom>
                    Şifre Sıfırla
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Yeni Şifre"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Yeni Şifre (Tekrar)"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Şifreyi Güncelle
                    </Button>
                </form>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Container>
    );
}

export default ResetPassword;
