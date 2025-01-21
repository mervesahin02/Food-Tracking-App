package com.sydmerve.controller;

import com.itextpdf.text.DocumentException;
import com.sydmerve.entities.Tarif;
import com.sydmerve.services.TarifService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tarif")
public class TarifController {

    private final TarifService tarifService;

    @Autowired
    public TarifController(TarifService tarifService) {
        this.tarifService = tarifService;
    }

    @PostMapping("/kaydet")
    public ResponseEntity<Tarif> addTarif(@Valid @RequestBody Tarif tarif, @RequestParam Long userId) {
        Tarif newTarif = tarifService.saveTarif(tarif, userId);
        return new ResponseEntity<>(newTarif, HttpStatus.CREATED);
    }

    @GetMapping("/hazir")
    public ResponseEntity<List<Tarif>> getHazirTarifler() {
        return ResponseEntity.ok(tarifService.getHazirTarifler());
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Tarif>> getTariflerByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(tarifService.getTariflerByUserId(userId));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Tarif> updateTarif(
            @PathVariable Long id,
            @RequestBody Tarif updatedTarif,
            @RequestParam Long userId
    ) {
        Tarif updated = tarifService.updateTarif(id, updatedTarif, userId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTarif(@PathVariable Long id, @RequestParam Long userId) {
        tarifService.deleteTarif(id, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadTarifPdf(@PathVariable Long id) {
        try {
            byte[] pdfContents = tarifService.generateSingleTariffPdf(id);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=tarif.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfContents);
        } catch (IOException | DocumentException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("PDF oluşturulurken bir hata oluştu".getBytes());
        }
    }
    
    @GetMapping("/list/all/{userId}")
    public ResponseEntity<List<Tarif>> getAllTariflerWithOwnership(@PathVariable Long userId) {
        return ResponseEntity.ok(tarifService.getAllTariflerWithOwnership(userId));
    }

    @PostMapping("/kaydet-hazir")
    public ResponseEntity<Tarif> addHazirTarif(@Valid @RequestBody Tarif tarif) {
        Tarif newTarif = tarifService.saveHazirTarif(tarif);
        return new ResponseEntity<>(newTarif, HttpStatus.CREATED);
    }

}
