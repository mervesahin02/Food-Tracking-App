import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { resetPassword } from '../services/api'; // Şifre sıfırlama API
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Snackbar,
    Modal,
} from '@mui/material';

function Login({ setAuthToken }) {
    const [formData, setFormData] = useState({ email: '', password: '', adSoyad: '', yas: '', kilo: '', boy: '' });
    const [error, setError] = useState(null);
    const [registerMode, setRegisterMode] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false); // Şifremi Unuttum Modal
    const [resetEmail, setResetEmail] = useState(''); // Şifre sıfırlama email

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = { email: formData.email, password: formData.password };
        const url = registerMode
            ? 'http://localhost:8080/api/kullanici/register'
            : 'http://localhost:8080/api/kullanici/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerMode ? formData : loginData),
            });

            if (response.ok) {
                const result = await response.json(); // Kullanıcı verilerini al
                if (registerMode) {
                    setSnackbarMessage('Kayıt başarılı! Giriş yapabilirsiniz.');
                    setSnackbarOpen(true);
                    setRegisterMode(false);
                } else {
                    setAuthToken(true);
                    // Kullanıcı bilgilerini UserContext'e ekle
                    setUser({
                        id: result.id,
                        email: result.email,
                        adSoyad: result.adSoyad,
                        yas: result.yas,
                        kilo: result.kilo,
                        boy: result.boy,
                    });
                    navigate('/dashboard');
                }
                setError(null);
            } else {
                setError(registerMode ? 'Kayıt işlemi başarısız.' : 'Email veya şifre hatalı.');
            }
        } catch (err) {
            setError('Sunucuyla bağlantı kurulamadı.');
        }
    };

    const handleForgotPassword = async () => {
        try {
            await resetPassword(resetEmail);
            setSnackbarMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
            setSnackbarOpen(true);
            setForgotPasswordModal(false);
            setResetEmail('');
        } catch (err) {
            setSnackbarMessage('Şifre sıfırlama işlemi sırasında bir hata oluştu.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

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
                    {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    {registerMode && (
                        <>
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
                        </>
                    )}
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
                        {registerMode ? 'Kayıt Ol' : 'Giriş Yap'}
                    </Button>
                </form>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    {registerMode ? (
                        <>
                            Zaten bir hesabınız var mı?{' '}
                            <Button onClick={() => setRegisterMode(false)}>Giriş Yap</Button>
                        </>
                    ) : (
                        <>
                            Üye değil misiniz?{' '}
                            <Button onClick={() => setRegisterMode(true)}>Kayıt Ol</Button>
                        </>
                    )}
                </Typography>

                {!registerMode && (
                    <Button onClick={() => setForgotPasswordModal(true)} color="primary" sx={{ mt: 1 }}>
                        Şifremi Unuttum
                    </Button>
                )}
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />

            {/* Şifremi Unuttum Modal */}
            <Modal open={forgotPasswordModal} onClose={() => setForgotPasswordModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Şifremi Unuttum
                    </Typography>
                    <TextField
                        label="E-posta Adresi"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button color="secondary" onClick={() => setForgotPasswordModal(false)}>
                            İptal
                        </Button>
                        <Button variant="contained" onClick={handleForgotPassword}>
                            Gönder
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}

export default Login;
