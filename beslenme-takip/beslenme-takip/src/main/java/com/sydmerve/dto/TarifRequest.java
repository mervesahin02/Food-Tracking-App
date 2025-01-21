package com.sydmerve.dto;

import com.sydmerve.entities.Tarif;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarifRequest {
    private Tarif tarif;
    private Long userId;
}
