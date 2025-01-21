package com.sydmerve.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sydmerve.entities.SuTuketimi;

@Repository
public interface SuTuketimiRepository extends JpaRepository<SuTuketimi, Long> {
    
    @Query("SELECT COALESCE(SUM(s.suMiktari), 0) FROM SuTuketimi s")
    
    double findTotalWaterConsumption(); // Toplam su miktarını döndüren özel sorgu
    List<SuTuketimi> findByKullaniciId(Long kullaniciId);
    
    /*
    @Query("SELECT s FROM SuTuketimi s WHERE s.kullanici.id = :kullaniciId AND s.tarih = :tarih")
    List<SuTuketimi> findDailyWaterConsumption(@Param("kullaniciId") Long kullaniciId, @Param("tarih") String tarih);
	*/
}
