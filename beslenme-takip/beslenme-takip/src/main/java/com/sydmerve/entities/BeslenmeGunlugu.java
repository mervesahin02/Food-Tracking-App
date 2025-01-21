package com.sydmerve.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "beslenme_gunlugu")
public class BeslenmeGunlugu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "kullanici_id", nullable = false)
    private Kullanici kullanici;

    @NotNull(message = "Tarih boş olamaz")
    @Column(name = "tarih", nullable = false)
    private LocalDate tarih;

    @NotNull(message = "Öğün tipi boş olamaz")
    @Enumerated(EnumType.STRING)
    @Column(name = "ogun_tipi", nullable = false)
    private OgunTipi ogunTipi;

    @NotNull(message = "Yemek adı boş olamaz")
    @Column(name = "yemek_adi", nullable = false, length = 100)
    private String yemekAdi;

    @Column(name = "kalori")
    private Double kalori;

    @Column(name = "notlar", length = 500)
    private String notlar;

    public enum OgunTipi {
        KAHVALTI,
        OGLE_YEMEGI,
        AKSAM_YEMEGI,
        ARA_OGUN
    }
}
