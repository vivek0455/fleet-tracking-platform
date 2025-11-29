package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByLocationIdAndLocationTypeAndProductId(Long locationId,
            Inventory.LocationType locationType, Long productId);
}
