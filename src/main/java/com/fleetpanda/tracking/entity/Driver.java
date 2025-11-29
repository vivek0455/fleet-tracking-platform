package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Driver extends BaseEntity {
    private String name;
    private String licenseNumber;

    @Enumerated(EnumType.STRING)
    private DriverStatus status;

    public enum DriverStatus {
        ACTIVE, INACTIVE
    }
}
