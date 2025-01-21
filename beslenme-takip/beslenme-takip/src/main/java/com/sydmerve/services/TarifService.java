package com.sydmerve.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.sydmerve.entities.Tarif;
import com.sydmerve.entities.Kullanici;
import com.sydmerve.exception.TarifNotFoundException;
import com.sydmerve.repository.TarifRepository;
import com.sydmerve.repository.KullaniciRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class TarifService {

    private final TarifRepository tarifRepository;
    private final KullaniciRepository kullaniciRepository;

    @Autowired
    public TarifService(TarifRepository tarifRepository, KullaniciRepository kullaniciRepository) {
        this.tarifRepository = tarifRepository;
        this.kullaniciRepository = kullaniciRepository;
    }

    public Tarif saveTarif(Tarif tarif, Long userId) {
        Kullanici kullanici = kullaniciRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + userId));
        tarif.setKullanici(kullanici);
        tarif.setHazirTarif(false);
        return tarifRepository.save(tarif);
    }

    public List<Tarif> getAllTarifler() {
        return tarifRepository.findAll();
    }

    public List<Tarif> getHazirTarifler() {
        return tarifRepository.findByIsHazirTarifTrue();
    }

    public List<Tarif> getTariflerByUserId(Long userId) {
        return tarifRepository.findByKullaniciId(userId);
    }

    public Tarif findTarifById(Long id) {
        return tarifRepository.findById(id)
            .orElseThrow(() -> new TarifNotFoundException("Tarif bulunamadı: " + id));
    }

    public Tarif updateTarif(Long id, Tarif updatedTarif, Long userId) {
        Tarif existingTarif = findTarifById(id);

        // Kullanıcı kontrolü
        if (existingTarif.isHazirTarif()) {
            throw new RuntimeException("Hazır tarifleri düzenleyemezsiniz.");
        }

        if (!existingTarif.getKullanici().getId().equals(userId)) {
            throw new RuntimeException("Sadece kendi tariflerinizi düzenleyebilirsiniz.");
        }

        // Güncelleme işlemi
        existingTarif.setTarifAdi(updatedTarif.getTarifAdi());
        existingTarif.setMalzemeler(updatedTarif.getMalzemeler());
        existingTarif.setTarifAciklama(updatedTarif.getTarifAciklama());
        existingTarif.setFotoUrl(updatedTarif.getFotoUrl());

        return tarifRepository.save(existingTarif);
    }

    public void deleteTarif(Long id, Long userId) {
        Tarif tarif = findTarifById(id);
        if (!tarif.isHazirTarif() && tarif.getKullanici().getId().equals(userId)) {
            tarifRepository.deleteById(id);
        } else {
            throw new RuntimeException("Sadece kendi eklediğiniz tarifleri silebilirsiniz.");
        }
    }

    public byte[] generateSingleTariffPdf(Long id) throws IOException, DocumentException {
        Tarif tarif = findTarifById(id);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();

        PdfWriter.getInstance(document, outputStream);
        document.open();

        document.add(new Paragraph("Tarif Adı: " + tarif.getTarifAdi()));
        document.add(new Paragraph("Açıklama: " + tarif.getTarifAciklama()));
        document.add(new Paragraph("Malzemeler: " + tarif.getMalzemeler()));

        document.close();

        return outputStream.toByteArray();
    }
    
    public List<Tarif> getAllTariflerWithOwnership(Long userId) {
        List<Tarif> allTarifler = tarifRepository.findAllByOrderByIsHazirTarifDesc();
        for (Tarif tarif : allTarifler) {
            if (tarif.getKullanici() != null && tarif.getKullanici().getId().equals(userId)) {
                tarif.setHazirTarif(false); // Kullanıcının düzenleme yetkisini işaretlemek için
            }
        }
        return allTarifler;
    }
    
    public Tarif saveHazirTarif(Tarif tarif) {
        tarif.setKullanici(null); // Kullanıcı bilgisi olmadan kaydedilecek
        tarif.setHazirTarif(true); // Hazır tarif olduğunu belirt
        return tarifRepository.save(tarif);
    }


}
