package com.sydmerve.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Kullanici {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Ad Soyad boş olamaz")
    @Size(max = 30, message = "Ad Soyad 30 karakteri geçemez")
    private String adSoyad;
    
    @Min(value = 1, message = "Yaş 1'den büyük olmalıdır")
    private int yas;

    @Positive(message = "Kilo pozitif bir değer olmalıdır")
    private double kilo;

    @Positive(message = "Boy pozitif bir değer olmalıdır")
    private double boy;

    @NotNull(message = "Şifre boş olamaz")
    @Size(min = 6, message = "Şifre en az 6 karakter olmalıdır")
    private String password;

    @NotNull(message = "E-posta boş olamaz")
    @Email(message = "Geçerli bir e-posta adresi giriniz")
    @Column(unique = true) // E-posta benzersiz olmalı
    private String email;
    
    @Column(name = "reset_token", nullable = true) // nullable = true ekledik
    private String resetToken;

}
