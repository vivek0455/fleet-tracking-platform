package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.GpsLog;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fleetpanda.tracking.entity.Vehicle;
import java.util.Optional;

public interface GpsLogRepository extends JpaRepository<GpsLog, Long> {
    Optional<GpsLog> findTopByVehicleOrderByTimestampDesc(Vehicle vehicle);
}
