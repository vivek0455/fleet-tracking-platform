package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Vehicle extends BaseEntity {
    private String licensePlate;
    private Double capacity;

    @Enumerated(EnumType.STRING)
    private VehicleStatus status;

    public enum VehicleStatus {
        AVAILABLE, MAINTENANCE, IN_USE
    }
}
