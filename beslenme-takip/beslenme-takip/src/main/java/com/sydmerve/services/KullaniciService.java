package com.sydmerve.services;

import com.sydmerve.dto.KullaniciDto;
import com.sydmerve.entities.Kullanici;
import com.sydmerve.exception.KullaniciNotFoundException;
import com.sydmerve.repository.KullaniciRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class KullaniciService {

    private final KullaniciRepository kullaniciRepository;

    @Autowired
    public KullaniciService(KullaniciRepository kullaniciRepository) {
        this.kullaniciRepository = kullaniciRepository;
    }
    @Autowired
    private JavaMailSender mailSender;

    // Kullanıcı kaydetme
    public void registerKullanici(KullaniciDto kullaniciDto) {
        Optional<Kullanici> existingByEmail = kullaniciRepository.findByEmail(kullaniciDto.getEmail());
        if (existingByEmail.isPresent()) {
            throw new IllegalStateException("Bu e-posta zaten kayıtlı.");
        }

        Optional<Kullanici> existingByName = kullaniciRepository.findByAdSoyad(kullaniciDto.getAdSoyad());
        if (existingByName.isPresent()) {
            throw new IllegalStateException("Bu kullanıcı adı zaten mevcut.");
        }

        Kullanici kullanici = new Kullanici();
        kullanici.setAdSoyad(kullaniciDto.getAdSoyad());
        kullanici.setYas(kullaniciDto.getYas());
        kullanici.setKilo(kullaniciDto.getKilo());
        kullanici.setBoy(kullaniciDto.getBoy());
        kullanici.setPassword(kullaniciDto.getPassword());
        kullanici.setEmail(kullaniciDto.getEmail());
        kullaniciRepository.save(kullanici);
    }

    public Optional<Kullanici> findByEmailAndPassword(String email, String password) {
        return kullaniciRepository.findByEmail(email)
                .filter(k -> k.getPassword().equals(password));
    }

 // Kullanıcı login doğrulama
    public boolean validateLogin(String email, String password) {
        Optional<Kullanici> kullanici = kullaniciRepository.findByEmail(email);
        return kullanici.map(k -> k.getPassword().equals(password)).orElse(false);
    }

    // Kullanıcı bilgilerini getirme
    public KullaniciDto getLoggedInUser(String email) {
        Kullanici user = kullaniciRepository.findByEmail(email)
                .orElseThrow(() -> new KullaniciNotFoundException("Kullanıcı bulunamadı: " + email));
        return new KullaniciDto(
                user.getId(), 
                user.getAdSoyad(), 
                user.getYas(), 
                user.getKilo(), 
                user.getBoy(), 
                user.getEmail(), 
                null
        );
    }


    // Kullanıcı güncelleme
    public KullaniciDto updateKullanici(Long id, KullaniciDto kullaniciDto) {
        Kullanici existing = kullaniciRepository.findById(id)
                .orElseThrow(() -> new KullaniciNotFoundException("Kullanıcı bulunamadı: " + id));

        existing.setAdSoyad(kullaniciDto.getAdSoyad());
        existing.setYas(kullaniciDto.getYas());
        existing.setKilo(kullaniciDto.getKilo());
        existing.setBoy(kullaniciDto.getBoy());

        if (kullaniciDto.getPassword() != null && !kullaniciDto.getPassword().isEmpty()) {
            existing.setPassword(kullaniciDto.getPassword());
        }

        if (kullaniciDto.getEmail() != null && !kullaniciDto.getEmail().isEmpty()) {
            existing.setEmail(kullaniciDto.getEmail());
        }

        Kullanici updated = kullaniciRepository.save(existing);
        return new KullaniciDto(updated.getId(), updated.getAdSoyad(), updated.getYas(), updated.getKilo(), updated.getBoy(), updated.getEmail(), null);
    }

 // Şifre sıfırlama isteği gönderme
    public void resetPassword(String email) {
        Kullanici kullanici = kullaniciRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Bu e-posta ile eşleşen bir kullanıcı bulunamadı."));

        // Şifre sıfırlama token'ı oluştur ve kaydet
        String resetToken = UUID.randomUUID().toString();
        kullanici.setResetToken(resetToken);
        kullaniciRepository.save(kullanici);

        // Şifre sıfırlama bağlantısını oluştur
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

        // E-posta gönderme
        sendPasswordResetEmail(kullanici.getEmail(), resetLink);

        System.out.println("Şifre sıfırlama bağlantısı gönderildi: " + resetLink);
    }

    // Token ve yeni şifre ile güncelleme
    public void updatePassword(String token, String newPassword) {
        Kullanici kullanici = kullaniciRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalStateException("Geçersiz veya süresi dolmuş token."));

        // Şifreyi güncelle ve token'ı temizle
        kullanici.setPassword(newPassword);
        kullanici.setResetToken(null); // Token sıfırlanıyor
        kullaniciRepository.save(kullanici);
    }

    // E-posta gönderme metodunda bir değişiklik yok
    private void sendPasswordResetEmail(String email, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Şifre Sıfırlama Talebi");
        message.setText("Merhaba,\n\nŞifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:\n" + resetLink
                + "\n\nEğer bu talebi siz oluşturmadıysanız, lütfen bu e-postayı görmezden gelin.");
        mailSender.send(message);
    }



    public void deleteKullanici(Long id) {
        kullaniciRepository.deleteById(id);
    }

    public List<Kullanici> getAllKullanicilar() {
        return kullaniciRepository.findAll();
    }
    // Kullanıcıyı ID'ye göre bulma
    public Kullanici findKullaniciById(Long id) {
        return kullaniciRepository.findById(id)
                .orElseThrow(() -> new KullaniciNotFoundException("Kullanıcı bulunamadı: " + id));
    }
}
