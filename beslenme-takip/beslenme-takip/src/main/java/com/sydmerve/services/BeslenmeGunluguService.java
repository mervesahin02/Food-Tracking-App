package com.sydmerve.services;

import com.sydmerve.dto.BeslenmeGunluguDTO;
import com.sydmerve.entities.BeslenmeGunlugu;
import com.sydmerve.entities.Kullanici;
import com.sydmerve.exception.BeslenmeGunluguNotFoundException;
import com.sydmerve.repository.BeslenmeGunluguRepository;
import com.sydmerve.repository.KullaniciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeslenmeGunluguService {

    private final BeslenmeGunluguRepository beslenmeGunluguRepository;
    private final KullaniciRepository kullaniciRepository;

    @Autowired
    public BeslenmeGunluguService(BeslenmeGunluguRepository beslenmeGunluguRepository,
                                  KullaniciRepository kullaniciRepository) {
        this.beslenmeGunluguRepository = beslenmeGunluguRepository;
        this.kullaniciRepository = kullaniciRepository;
    }

    // DTO'dan Entity'ye dönüştürme
    private BeslenmeGunlugu convertToEntity(BeslenmeGunluguDTO dto) {
        BeslenmeGunlugu gunluk = new BeslenmeGunlugu();
        Kullanici kullanici = kullaniciRepository.findById(dto.getKullaniciId())
                .orElseThrow(() -> new BeslenmeGunluguNotFoundException("Kullanıcı bulunamadı: " + dto.getKullaniciId()));
        gunluk.setId(dto.getId());
        gunluk.setKullanici(kullanici);
        gunluk.setTarih(dto.getTarih());
        gunluk.setOgunTipi(BeslenmeGunlugu.OgunTipi.valueOf(dto.getOgunTipi()));
        gunluk.setYemekAdi(dto.getYemekAdi());
        gunluk.setKalori(dto.getKalori());
        gunluk.setNotlar(dto.getNotlar());
        return gunluk;
    }

    // Entity'den DTO'ya dönüştürme
    private BeslenmeGunluguDTO convertToDTO(BeslenmeGunlugu gunluk) {
        BeslenmeGunluguDTO dto = new BeslenmeGunluguDTO();
        dto.setId(gunluk.getId());
        dto.setKullaniciId(gunluk.getKullanici().getId());
        dto.setTarih(gunluk.getTarih());
        dto.setOgunTipi(gunluk.getOgunTipi().name());
        dto.setYemekAdi(gunluk.getYemekAdi());
        dto.setKalori(gunluk.getKalori());
        dto.setNotlar(gunluk.getNotlar());
        return dto;
    }

    // Günlük ekleme veya güncelleme
    public BeslenmeGunluguDTO saveOrUpdateBeslenmeGunlugu(BeslenmeGunluguDTO dto) {
        BeslenmeGunlugu gunluk = convertToEntity(dto);
        return convertToDTO(beslenmeGunluguRepository.save(gunluk));
    }

    // Belirli bir kullanıcı ve tarihe ait yemek günlüğünü getir
    public List<BeslenmeGunluguDTO> getBeslenmeGunluguByKullaniciAndTarih(Long kullaniciId, LocalDate tarih) {
        return beslenmeGunluguRepository.findByKullaniciIdAndTarih(kullaniciId, tarih)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Kullanıcının tüm yemek günlüklerini getir
    public List<BeslenmeGunluguDTO> getAllBeslenmeGunluguByKullanici(Long kullaniciId) {
        return beslenmeGunluguRepository.findByKullaniciIdOrderByTarihDesc(kullaniciId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Günlük ID'sine göre silme
    public void deleteBeslenmeGunlugu(Long id) {
        if (!beslenmeGunluguRepository.existsById(id)) {
            throw new BeslenmeGunluguNotFoundException("Beslenme günlüğü bulunamadı: " + id);
        }
        beslenmeGunluguRepository.deleteById(id);
    }
}
