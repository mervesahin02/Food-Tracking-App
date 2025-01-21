package com.sydmerve.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {
    private long usersCount;
    private long recipesCount;
    private long exercisesCount;
    private double waterConsumptionTotal;
}
