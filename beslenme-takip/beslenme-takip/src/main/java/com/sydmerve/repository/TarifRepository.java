package com.sydmerve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sydmerve.entities.Tarif;
import com.sydmerve.entities.Kullanici;

import java.util.List;

@Repository
public interface TarifRepository extends JpaRepository<Tarif, Long> {
    List<Tarif> findByKullanici(Kullanici kullanici);

    List<Tarif> findByKullaniciId(Long userId);

    List<Tarif> findByIsHazirTarifTrue(); // Hazır tarifleri getirir

    List<Tarif> findAllByOrderByIsHazirTarifDesc(); // Hazır tarifleri ve kullanıcı tariflerini sırayla getirir

}
