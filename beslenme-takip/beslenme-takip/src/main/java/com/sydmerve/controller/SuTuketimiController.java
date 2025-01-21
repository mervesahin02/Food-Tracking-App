package com.sydmerve.controller;

import com.sydmerve.entities.Kullanici;
import com.sydmerve.entities.SuTuketimi;
import com.sydmerve.repository.KullaniciRepository;
import com.sydmerve.services.SuTuketimiService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/su-tuketimi")
public class SuTuketimiController {

    private final SuTuketimiService suTuketimiService;

    @Autowired
    public SuTuketimiController(SuTuketimiService suTuketimiService) {
        this.suTuketimiService = suTuketimiService;
    }
    @Autowired
    private KullaniciRepository kullaniciRepository;


    // Su tüketimi ekleme
    @PostMapping(path = "/kaydet")
    public ResponseEntity<SuTuketimi> addSuTuketimi(@Valid @RequestBody SuTuketimi suTuketimi) {
        if (suTuketimi.getKullanici() != null && suTuketimi.getKullanici().getId() != null) {
            Kullanici kullanici = kullaniciRepository.findById(suTuketimi.getKullanici().getId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + suTuketimi.getKullanici().getId()));
            suTuketimi.setKullanici(kullanici);
        } else {
            throw new RuntimeException("Geçerli bir kullanıcı ID'si gereklidir.");
        }

        SuTuketimi newSuTuketimi = suTuketimiService.saveSuTuketimi(suTuketimi);
        return new ResponseEntity<>(newSuTuketimi, HttpStatus.CREATED);
    }


    // Tüm su tüketimlerini listeleme
    @GetMapping(path = "/list")
    public ResponseEntity<List<SuTuketimi>> getAllSuTuketimleri() {
        List<SuTuketimi> suTuketimleri = suTuketimiService.getAllSuTuketimleri();
        return ResponseEntity.ok(suTuketimleri);
    }

    // Su tüketimi ID'ye göre bulma
    @GetMapping("/list/{id}")
    public ResponseEntity<SuTuketimi> getSuTuketimi(@PathVariable Long id) {
        SuTuketimi suTuketimi = suTuketimiService.findSuTuketimiById(id);
        return ResponseEntity.ok(suTuketimi);
    }
    
 // Belirli bir kullanıcının su tüketimlerini listeleme
    @GetMapping("/list/user/{kullaniciId}")
    public ResponseEntity<?> getUserSuTuketimleri(@PathVariable Long kullaniciId) {
        try {
            List<SuTuketimi> suTuketimleri = suTuketimiService.getUserSuTuketimleri(kullaniciId);
            return ResponseEntity.ok(suTuketimleri);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }




    // Su tüketimi silme
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSuTuketimi(@PathVariable Long id) {
        suTuketimiService.deleteSuTuketimi(id);
        return ResponseEntity.noContent().build();
    }
    // Su tüketimi güncelleme metodu
    @PutMapping("/update/{id}")
    public ResponseEntity<SuTuketimi> updateSuTuketimi(@PathVariable Long id, @Valid @RequestBody SuTuketimi updatedSuTuketimi) {
        SuTuketimi updated = suTuketimiService.updateSuTuketimi(id, updatedSuTuketimi);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
}
