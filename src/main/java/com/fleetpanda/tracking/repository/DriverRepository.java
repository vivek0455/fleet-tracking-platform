package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
}
