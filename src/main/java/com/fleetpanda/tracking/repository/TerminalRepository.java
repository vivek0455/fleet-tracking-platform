package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Terminal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TerminalRepository extends JpaRepository<Terminal, Long> {
}
