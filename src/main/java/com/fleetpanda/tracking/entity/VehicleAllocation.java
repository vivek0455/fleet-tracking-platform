package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = { "vehicle_id", "date" }),
        @UniqueConstraint(columnNames = { "driver_id", "date" })
})
public class VehicleAllocation extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private LocalDate date;
}
