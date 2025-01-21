package com.sydmerve.services;

import com.sydmerve.dto.DashboardSummaryDto;
import com.sydmerve.repository.*;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final KullaniciRepository kullaniciRepository;
    private final TarifRepository tarifRepository;
    private final EgzersizRepository egzersizRepository;
    private final SuTuketimiRepository suTuketimiRepository;

    public DashboardService(KullaniciRepository kullaniciRepository,
                            TarifRepository tarifRepository,
                            EgzersizRepository egzersizRepository,
                            SuTuketimiRepository suTuketimiRepository) {
        this.kullaniciRepository = kullaniciRepository;
        this.tarifRepository = tarifRepository;
        this.egzersizRepository = egzersizRepository;
        this.suTuketimiRepository = suTuketimiRepository;
    }

    public DashboardSummaryDto getDashboardSummary() {
        long usersCount = kullaniciRepository.count(); // Kullanıcı sayısı
        long recipesCount = tarifRepository.count();  // Tarif sayısı
        long exercisesCount = egzersizRepository.count(); // Egzersiz sayısı
        double waterConsumptionTotal = suTuketimiRepository
                .findTotalWaterConsumption(); // Toplam su tüketimi

        return new DashboardSummaryDto(usersCount, recipesCount, exercisesCount, waterConsumptionTotal);
    }
}
