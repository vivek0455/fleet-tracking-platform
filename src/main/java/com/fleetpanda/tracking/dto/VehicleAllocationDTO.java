package com.fleetpanda.tracking.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class VehicleAllocationDTO {
    private Long id;
    private Long driverId;
    private Long vehicleId;
    private LocalDate date;
}
