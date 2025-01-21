package com.sydmerve.services;

import com.sydmerve.entities.SuTuketimi;
import com.sydmerve.exception.SuTuketimiNotFoundException;
import com.sydmerve.repository.KullaniciRepository;
import com.sydmerve.repository.SuTuketimiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuTuketimiService {
	
	@Autowired
    private final SuTuketimiRepository suTuketimiRepository;
    
    @Autowired
    private KullaniciRepository kullaniciRepository;

    @Autowired
    public SuTuketimiService(SuTuketimiRepository suTuketimiRepository) {
        this.suTuketimiRepository = suTuketimiRepository;
    }

    // Su tüketimi kaydetme
    public SuTuketimi saveSuTuketimi(SuTuketimi suTuketimi) {
        return suTuketimiRepository.save(suTuketimi);
    }

    // Su tüketimlerini listeleme
    public List<SuTuketimi> getAllSuTuketimleri() {
        return suTuketimiRepository.findAll();
    }

    // Su tüketimi bulma
    public SuTuketimi findSuTuketimiById(Long id) {
        return suTuketimiRepository.findById(id)
            .orElseThrow(() -> new SuTuketimiNotFoundException("Su tüketimi kaydı bulunamadı: " + id));
    }
    
    public List<SuTuketimi> getUserSuTuketimleri(Long kullaniciId) {
        if (!kullaniciRepository.existsById(kullaniciId)) {
            throw new RuntimeException("Belirtilen kullanıcı bulunamadı: " + kullaniciId);
        }
        return suTuketimiRepository.findByKullaniciId(kullaniciId);
    }



    // Su tüketimi silme
    public void deleteSuTuketimi(Long id) {
        if (!suTuketimiRepository.existsById(id)) {
            throw new SuTuketimiNotFoundException("Silinmek istenen su tüketimi kaydı bulunamadı: " + id);
        }
        suTuketimiRepository.deleteById(id);
    }
    
    // Su tüketimi güncelleme metodu
    public SuTuketimi updateSuTuketimi(Long id, SuTuketimi updatedSuTuketimi) {
        Optional<SuTuketimi> existingSuTuketimi = suTuketimiRepository.findById(id);
        if (existingSuTuketimi.isPresent()) {
            SuTuketimi suTuketimi = existingSuTuketimi.get();
            suTuketimi.setSuMiktari(updatedSuTuketimi.getSuMiktari());
            suTuketimi.setTarih(updatedSuTuketimi.getTarih());
            suTuketimi.setKullanici(updatedSuTuketimi.getKullanici()); // Kullanıcı değiştirilebilir ise
            return suTuketimiRepository.save(suTuketimi);
        } else {
            throw new SuTuketimiNotFoundException("Su tüketimi kaydı bulunamadı: " + id);
        }
    }
}
