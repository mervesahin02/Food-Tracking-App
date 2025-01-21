package com.sydmerve.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BeslenmeGunluguDTO {

    private Long id;

    @NotNull(message = "Kullanıcı ID boş olamaz")
    private Long kullaniciId;

    @NotNull(message = "Tarih boş olamaz")
    private LocalDate tarih;

    @NotNull(message = "Öğün tipi boş olamaz")
    private String ogunTipi;

    @NotNull(message = "Yemek adı boş olamaz")
    private String yemekAdi;

    private Double kalori;

    private String notlar;
}
