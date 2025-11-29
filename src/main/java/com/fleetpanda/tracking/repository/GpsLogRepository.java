package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.GpsLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpsLogRepository extends JpaRepository<GpsLog, Long> {
}
