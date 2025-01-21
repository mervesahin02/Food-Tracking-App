package com.sydmerve.controller;
import com.itextpdf.text.DocumentException;
import com.sydmerve.entities.Egzersiz;
import com.sydmerve.services.EgzersizService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/egzersiz")
public class EgzersizController {
    private final EgzersizService egzersizService;

    @Autowired
    public EgzersizController(EgzersizService egzersizService) {
        this.egzersizService = egzersizService;
    }

    // Egzersiz ekleme
    @PostMapping(path = "/kaydet")
    public ResponseEntity<Egzersiz> addEgzersiz(@Valid @RequestBody Egzersiz egzersiz) {
        Egzersiz newEgzersiz = egzersizService.saveEgzersiz(egzersiz);
        return new ResponseEntity<>(newEgzersiz, HttpStatus.CREATED);
    }

    // Tüm egzersizleri listeleme
    @GetMapping(path = "/list")
    public ResponseEntity<List<Egzersiz>> getAllEgzersizler() {
        List<Egzersiz> egzersizler = egzersizService.getAllEgzersizler();
        return ResponseEntity.ok(egzersizler);
    }

    // Egzersiz ID'ye göre bulma
    @GetMapping("/list/{id}")
    public ResponseEntity<Egzersiz> getEgzersiz(@PathVariable Long id) {
        Egzersiz egzersiz = egzersizService.findEgzersizById(id);
        return ResponseEntity.ok(egzersiz);
    }


    // Egzersiz silme
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEgzersiz(@PathVariable Long id) {
        egzersizService.deleteEgzersiz(id);
        return ResponseEntity.noContent().build();
    }
    // Egzersiz güncelleme metodus
    @PutMapping("/update/{id}")
    public ResponseEntity<Egzersiz> updateEgzersiz(@PathVariable Long id, @Valid @RequestBody Egzersiz updatedEgzersiz) {
        Egzersiz updated = egzersizService.updateEgzersiz(id, updatedEgzersiz);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    // Tek egzersiz indir
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadEgzersizPdf(@PathVariable Long id) {
        try {
            byte[] pdfContents = egzersizService.generateSingleExercisePdf(id);  // Tek egzersiz için PDF oluştur
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=egzersiz.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContents);
        } catch (IOException | DocumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("PDF oluşturulurken bir hata oluştu".getBytes());
        }
    }
    
}
