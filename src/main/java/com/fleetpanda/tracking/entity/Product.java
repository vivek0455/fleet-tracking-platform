package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Product extends BaseEntity {
    private String name;

    @Enumerated(EnumType.STRING)
    private ProductType type;

    public enum ProductType {
        DIESEL, PETROL, OTHER
    }
}
