package com.sydmerve.controller;

import com.sydmerve.dto.KullaniciDto;
import com.sydmerve.dto.LoginRequestDto;
import com.sydmerve.entities.Kullanici;
import com.sydmerve.services.KullaniciService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kullanici")
public class KullaniciController {

    private final KullaniciService kullaniciService;

    @Autowired
    public KullaniciController(KullaniciService kullaniciService) {
        this.kullaniciService = kullaniciService;
    }

    // Kullanıcı kaydetme
    @PostMapping("/register")
    public ResponseEntity<String> registerKullanici(@Valid @RequestBody KullaniciDto kullaniciDto) {
        try {
            kullaniciService.registerKullanici(kullaniciDto);
            return ResponseEntity.status(HttpStatus.CREATED)
            	    .body("{\"message\": \"Kayıt başarılı!\"}");

        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

 // Kullanıcı login işlemi
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        Optional<Kullanici> kullanici = kullaniciService.findByEmailAndPassword(
                loginRequestDto.getEmail(), loginRequestDto.getPassword());

        if (kullanici.isPresent()) {
            return ResponseEntity.ok(kullanici.get()); // Kullanıcı bilgilerini döndür
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email veya şifre hatalı.");
        }
    }


    // Kullanıcı bilgilerini getirme
    @PostMapping("/me")
    public ResponseEntity<KullaniciDto> getLoggedInUser(@RequestBody String email) {
        email = email.replace("\"", ""); // Gereksiz tırnakları temizle
        KullaniciDto kullaniciDto = kullaniciService.getLoggedInUser(email);
        return ResponseEntity.ok(kullaniciDto);
    }


    // Kullanıcıyı silme
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteKullanici(@PathVariable Long id) {
        kullaniciService.deleteKullanici(id);
        return ResponseEntity.noContent().build();
    }

    // Kullanıcıyı güncelleme
    @PutMapping("/update/{id}")
    public ResponseEntity<KullaniciDto> updateKullanici(@PathVariable Long id, @Valid @RequestBody KullaniciDto kullaniciDto) {
        KullaniciDto updated = kullaniciService.updateKullanici(id, kullaniciDto);
        return ResponseEntity.ok(updated);
    }

    // Şifre sıfırlama endpointi
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email) {
        try {
            kullaniciService.resetPassword(email);
            return ResponseEntity.ok("Şifre sıfırlama bağlantısı e-postanıza gönderildi.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
 // Şifre sıfırlama işlemi
    @PutMapping("/reset-password")
    public ResponseEntity<String> updatePassword(@RequestParam String token, @RequestBody String newPassword) {
        try {
            // Şifre çift tırnak içeriyor olabilir, burada temizleme yapılır.
            String cleanedPassword = newPassword.replace("\"", "").trim();
            kullaniciService.updatePassword(token, cleanedPassword);
            return ResponseEntity.ok("Şifre başarıyla güncellendi.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    // Tüm kullanıcıları listeleme
    @GetMapping("/list")
    public ResponseEntity<List<Kullanici>> getAllKullanicilar() {
        List<Kullanici> kullanicilar = kullaniciService.getAllKullanicilar();
        return ResponseEntity.ok(kullanicilar);
    }
}
