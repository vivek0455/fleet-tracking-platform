package com.fleetpanda.tracking.dto;

import com.fleetpanda.tracking.entity.Driver;
import lombok.Data;

@Data
public class DriverDTO {
    private Long id;
    private String name;
    private String licenseNumber;
    private Driver.DriverStatus status;
}
