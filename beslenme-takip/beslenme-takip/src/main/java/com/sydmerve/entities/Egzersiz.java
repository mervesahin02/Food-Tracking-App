package com.sydmerve.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Egzersiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Egzersiz adı boş olamaz")
    @Size(max = 50, message = "Egzersiz adı 50 karakteri geçemez")
    private String egzersizAdi;
    
    @Size(max = 500, message = "Açıklama 500 karakteri geçemez")
    private String aciklama;
    
    @Pattern(regexp = "Kolay|Orta|Zor", message = "Zorluk seviyesi yalnızca 'Kolay', 'Orta' veya 'Zor' değerlerini alabilir")
    private String zorlukSeviyesi;  // Kolay, Orta, Zor gibi
    
    @Column(name = "gorsel_url", nullable = true)
    private String gorselUrl; // Yeni alan
}