package com.sydmerve.controller;

import com.sydmerve.dto.BeslenmeGunluguDTO;
import com.sydmerve.services.BeslenmeGunluguService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/beslenme-gunlugu")
public class BeslenmeGunluguController {

    private final BeslenmeGunluguService beslenmeGunluguService;

    @Autowired
    public BeslenmeGunluguController(BeslenmeGunluguService beslenmeGunluguService) {
        this.beslenmeGunluguService = beslenmeGunluguService;
    }

    // Yeni beslenme günlüğü ekleme veya güncelleme
    @PostMapping("/kaydet")
    public ResponseEntity<BeslenmeGunluguDTO> saveOrUpdateBeslenmeGunlugu(@RequestBody BeslenmeGunluguDTO dto) {
        BeslenmeGunluguDTO savedGunluk = beslenmeGunluguService.saveOrUpdateBeslenmeGunlugu(dto);
        return new ResponseEntity<>(savedGunluk, HttpStatus.CREATED);
    }

    // Kullanıcı ve tarihe göre beslenme günlüğünü getir
    @GetMapping("/listele/{kullaniciId}/{tarih}")
    public ResponseEntity<List<BeslenmeGunluguDTO>> getBeslenmeGunluguByKullaniciAndTarih(
            @PathVariable Long kullaniciId,
            @PathVariable String tarih) {
        LocalDate localDate = LocalDate.parse(tarih); // Tarihi dönüştür
        List<BeslenmeGunluguDTO> gunlukler = beslenmeGunluguService.getBeslenmeGunluguByKullaniciAndTarih(kullaniciId, localDate);
        return ResponseEntity.ok(gunlukler);
    }

    // Kullanıcının tüm beslenme günlüklerini getir
    @GetMapping("/listele/{kullaniciId}")
    public ResponseEntity<List<BeslenmeGunluguDTO>> getAllBeslenmeGunluguByKullanici(@PathVariable Long kullaniciId) {
        List<BeslenmeGunluguDTO> gunlukler = beslenmeGunluguService.getAllBeslenmeGunluguByKullanici(kullaniciId);
        return ResponseEntity.ok(gunlukler);
    }

    // Beslenme günlüğü sil
    @DeleteMapping("/sil/{id}")
    public ResponseEntity<Void> deleteBeslenmeGunlugu(@PathVariable Long id) {
        beslenmeGunluguService.deleteBeslenmeGunlugu(id);
        return ResponseEntity.noContent().build();
    }
}
