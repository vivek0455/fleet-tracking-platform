package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByShiftId(Long shiftId);
}
