package com.sydmerve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sydmerve.entities.Kullanici;

import java.util.Optional;

@Repository
public interface KullaniciRepository extends JpaRepository<Kullanici, Long> {
    Optional<Kullanici> findByAdSoyad(String adSoyad);
    Optional<Kullanici> findByEmail(String email); // E-posta ile kullanıcı arama
    
    Optional<Kullanici> findByResetToken(String resetToken);

}
