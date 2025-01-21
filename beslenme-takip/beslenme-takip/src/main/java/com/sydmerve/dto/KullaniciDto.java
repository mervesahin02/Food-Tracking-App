package com.sydmerve.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KullaniciDto {
    private Long id;
    
    @NotNull(message = "Ad Soyad boş olamaz")
    @Size(max = 30, message = "Ad Soyad 30 karakteri geçemez")
    private String adSoyad;

    @Positive(message = "Yaş pozitif bir değer olmalıdır")
    private int yas;

    @Positive(message = "Kilo pozitif bir değer olmalıdır")
    private double kilo;

    @Positive(message = "Boy pozitif bir değer olmalıdır")
    private double boy;

    @NotNull(message = "E-posta boş olamaz")
    @Email(message = "Geçerli bir e-posta adresi giriniz")
    private String email;

    @Size(min = 6, message = "Şifre en az 6 karakter olmalıdır")
    private String password;
}
