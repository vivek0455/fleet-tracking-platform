package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Hub;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HubRepository extends JpaRepository<Hub, Long> {
}
