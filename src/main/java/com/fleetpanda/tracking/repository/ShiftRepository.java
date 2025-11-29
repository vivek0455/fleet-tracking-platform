package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    Optional<Shift> findByDriverIdAndStatus(Long driverId, Shift.ShiftStatus status);
}
