import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import '../styles/Contact.css'; // CSS dosyasını import ediyoruz

function Contact() {
    return (
        <Container maxWidth="md" sx={{ marginTop: '40px', padding: '20px' }}>
            <Card className="contact-card">
                {/* Görsel */}
                <CardMedia
                    component="img"
                    className="contact-card-media"
                    image={require('../assets/contactpage.jpg')} // Görsel ekleme
                    alt="İletişim Görseli"
                />

                {/* İçerik */}
                <CardContent className="contact-card-content">
                    <Typography variant="h4" gutterBottom className="contact-title">
                        İletişim
                    </Typography>
                    <Typography variant="body1" className="contact-body">
                        Beslenme Takip Uygulaması Hakkında Daha Fazla Bilgi İçin Bizimle İletişime Geçin
                    </Typography>

                    <Box className="contact-text">
                        <Typography variant="h6" gutterBottom>
                            <strong>Proje Ekibi:</strong>
                        </Typography>
                        <Typography>
                            <strong>Proje Sahibi:</strong> Seyyide Merve Şahin
                        </Typography>
                        <Typography>
                            <strong>E-posta:</strong>{' '}
                            <a href="mailto:sydmervesihin@gmail.com">sydmervesihin@gmail.com</a>
                        </Typography>
                        <Typography>
                            <strong>Proje Açıklaması:</strong> Bu uygulama sağlıklı yaşamı destekleyen egzersiz, su tüketimi
                            ve tarif yönetimini kolaylaştırır.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Contact;
