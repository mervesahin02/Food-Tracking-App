package com.sydmerve.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Tarif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Tarif adı boş olamaz")
    @Size(max = 50, message = "Tarif adı 50 karakteri geçemez")
    private String tarifAdi;

    @NotNull(message = "Malzemeler boş olamaz")
    @Size(max = 255, message = "Malzemeler 255 karakteri geçemez")
    private String malzemeler;

    @Size(max = 500, message = "Tarif açıklaması 500 karakteri geçemez")
    private String tarifAciklama;

    @Size(max = 255, message = "Fotoğraf URL'si 255 karakteri geçemez")
    private String fotoUrl; // Fotoğraf için URL

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Kullanici kullanici; // Kullanıcı bilgisi

    @Column(nullable = false)
    private boolean isHazirTarif = false; // Hazır tarif olup olmadığını belirtir

    public String getUserName() {
        return kullanici != null ? kullanici.getAdSoyad() : "Bilinmeyen Kullanıcı";
    }
}
