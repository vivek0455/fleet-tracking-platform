package com.fleetpanda.tracking.dto;

import com.fleetpanda.tracking.entity.Vehicle;
import lombok.Data;

@Data
public class VehicleDTO {
    private Long id;
    private String licensePlate;
    private Double capacity;
    private Vehicle.VehicleStatus status;
}
