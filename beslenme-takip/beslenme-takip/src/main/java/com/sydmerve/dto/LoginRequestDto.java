package com.sydmerve.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequestDto {

    @Email(message = "Geçerli bir email adresi giriniz")
    @NotNull(message = "Email boş olamaz")
    private String email;

    @NotNull(message = "Şifre boş olamaz")
    @Size(min = 6, message = "Şifre en az 6 karakter olmalıdır")
    private String password;
}
