package com.sydmerve.repository;

import com.sydmerve.entities.BeslenmeGunlugu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BeslenmeGunluguRepository extends JpaRepository<BeslenmeGunlugu, Long> {
    
    // Kullanıcıya ve tarihe göre yemek günlüğünü getir
    List<BeslenmeGunlugu> findByKullaniciIdAndTarih(Long kullaniciId, LocalDate tarih);

    // Kullanıcının tüm yemek günlüklerini getir (tarihe göre sıralı)
    List<BeslenmeGunlugu> findByKullaniciIdOrderByTarihDesc(Long kullaniciId);
}
