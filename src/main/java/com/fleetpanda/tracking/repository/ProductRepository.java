package com.fleetpanda.tracking.repository;

import com.fleetpanda.tracking.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}