package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.VehicleAllocation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface VehicleAllocationRepository extends JpaRepository<VehicleAllocation, Long> {
    Optional<VehicleAllocation> findByVehicleIdAndDate(Long vehicleId, LocalDate date);

    Optional<VehicleAllocation> findByDriverIdAndDate(Long driverId, LocalDate date);
}
