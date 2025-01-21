package com.sydmerve.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.sydmerve.entities.Egzersiz;
import com.sydmerve.exception.EgzersizNotFoundException;
import com.sydmerve.repository.EgzersizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class EgzersizService {

    private final EgzersizRepository egzersizRepository;

    @Autowired
    public EgzersizService(EgzersizRepository egzersizRepository) {
        this.egzersizRepository = egzersizRepository;
    }

    // Egzersiz kaydetme
    public Egzersiz saveEgzersiz(Egzersiz egzersiz) {
        return egzersizRepository.save(egzersiz);
    }

    // Egzersizleri listeleme
    public List<Egzersiz> getAllEgzersizler() {
        return egzersizRepository.findAll();
    }

    // Egzersiz bulma
    public Egzersiz findEgzersizById(Long id) {
        return egzersizRepository.findById(id)
            .orElseThrow(() -> new EgzersizNotFoundException("Egzersiz bulunamadı: " + id));
    }

    // Egzersiz silme
    public void deleteEgzersiz(Long id) {
        if (!egzersizRepository.existsById(id)) {
            throw new EgzersizNotFoundException("Silinmek istenen egzersiz bulunamadı: " + id);
        }
        egzersizRepository.deleteById(id);
    }
    
    // Egzersiz güncelleme metodu
    public Egzersiz updateEgzersiz(Long id, Egzersiz updatedEgzersiz) {
        Optional<Egzersiz> existingEgzersiz = egzersizRepository.findById(id);
        if (existingEgzersiz.isPresent()) {
            Egzersiz egzersiz = existingEgzersiz.get();
            egzersiz.setEgzersizAdi(updatedEgzersiz.getEgzersizAdi());
            egzersiz.setAciklama(updatedEgzersiz.getAciklama());
            egzersiz.setZorlukSeviyesi(updatedEgzersiz.getZorlukSeviyesi());
            return egzersizRepository.save(egzersiz);
        } else {
            throw new EgzersizNotFoundException("Egzersiz bulunamadı: " + id);
        }
    }
 // Egzersiz PDF oluşturma metodu
    public byte[] generateSingleExercisePdf(Long id) throws IOException, DocumentException {
        // Egzersizi alıyoruz
        Egzersiz egzersiz = findEgzersizById(id);

        // PDF oluşturulacak ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();

        // PDF yazıcıyı başlat
        PdfWriter.getInstance(document, outputStream);
        document.open();

        // Egzersizi PDF'ye yaz
        document.add(new Paragraph("Egzersiz Adı: " + egzersiz.getEgzersizAdi()));
        document.add(new Paragraph("Açıklama: " + egzersiz.getAciklama()));
        document.add(new Paragraph("Zorluk Seviyesi: " + egzersiz.getZorlukSeviyesi()));
        document.add(Paragraph.getInstance("\n"));

        // PDF'i kapat
        document.close();

        // ByteArrayOutputStream içeriğini byte dizisine çevir
        return outputStream.toByteArray();
    }

}
