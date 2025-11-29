package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
