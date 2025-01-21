package com.sydmerve.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Data
public class SuTuketimi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "Su miktarı pozitif bir değer olmalıdır")
    private double suMiktari;  // Su miktarı (litre veya bardak)
    
    @NotNull(message = "Tarih boş olamaz")
    private String tarih;

    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "kullanici_id", nullable = false)
    private Kullanici kullanici;  // Bir kullanıcı birden fazla su kaydı ekleyebilir
}
