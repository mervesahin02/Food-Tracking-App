import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateProfileData } from '../services/api';
import { Box, Typography, Button, Paper, Avatar, Modal, TextField, Grid, Alert } from '@mui/material';
import { useUser } from '../context/UserContext';

function Profile() {
    const { user } = useUser(); // Kullanıcı bilgilerini context'ten çekiyoruz
    const [profileData, setProfileData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile(user.email); // Backend'den veri çekiliyor
                setProfileData(data);
                setUpdatedData({ ...data, password: '' }); // Yeni şifre alanını ekle
            } catch (err) {
                setError('Kullanıcı bilgileri yüklenemedi.');
            }
        };
        loadProfile();
    }, [user.email]);

    const handleChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const { password, ...otherData } = updatedData;
            const payload = password ? updatedData : otherData; // Şifre opsiyonel olarak gönderilir
            const updatedProfile = await updateProfileData(profileData.id, payload);
            setProfileData(updatedProfile);
            setIsEditMode(false);
        } catch (err) {
            setError('Güncelleme sırasında bir hata oluştu.');
        }
    };

    return (
        <Box
            sx={{
                padding: '40px',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to bottom right, #2196f3, #f3e5f5)',
            }}
        >
            {error && <Alert severity="error">{error}</Alert>}
            {profileData && (
                <>
                    <Paper
                        sx={{
                            padding: '30px',
                            maxWidth: '350px',
                            textAlign: 'center',
                            borderRadius: '20px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {/* Kullanıcı Profil Fotoğrafı */}
                        <Avatar
                            alt={profileData.adSoyad}
                            sx={{
                                width: 100,
                                height: 100,
                                margin: '0 auto 20px',
                                backgroundColor: '#1976d2',
                                fontSize: '50px',
                            }}
                        >
                            {profileData.adSoyad.charAt(0).toUpperCase()}
                        </Avatar>

                        {/* Kullanıcı Bilgileri */}
                        <Typography variant="h5" gutterBottom>
                            {profileData.adSoyad}
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={6}>
                                <Typography variant="body1">Yaş</Typography>
                                <Typography variant="body2">{profileData.yas}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">Kilo</Typography>
                                <Typography variant="body2">{profileData.kilo} kg</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">Boy</Typography>
                                <Typography variant="body2">{profileData.boy} cm</Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Email: {profileData.email}
                        </Typography>
                        <Button variant="contained" sx={{ mt: 3 }} onClick={() => setIsEditMode(true)}>
                            Bilgileri Güncelle
                        </Button>
                    </Paper>

                    {/* Güncelleme Modalı */}
                    <Modal open={isEditMode} onClose={() => setIsEditMode(false)}>
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
                                Bilgileri Güncelle
                            </Typography>
                            <TextField
                                label="Ad Soyad"
                                name="adSoyad"
                                value={updatedData.adSoyad || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                disabled
                            />
                            <TextField
                                label="Yaş"
                                name="yas"
                                value={updatedData.yas || ''}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Kilo (kg)"
                                name="kilo"
                                value={updatedData.kilo || ''}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Boy (cm)"
                                name="boy"
                                value={updatedData.boy || ''}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Yeni Şifre (Opsiyonel)"
                                name="password"
                                type="password"
                                value={updatedData.password || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button color="error" onClick={() => setIsEditMode(false)}>
                                    İptal
                                </Button>
                                <Button variant="contained" onClick={handleUpdate}>
                                    Kaydet
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </>
            )}
        </Box>
    );
}

export default Profile;
