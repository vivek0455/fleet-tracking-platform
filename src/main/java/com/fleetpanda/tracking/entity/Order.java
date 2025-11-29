package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "orders") // Order is a reserved keyword in SQL
public class Order extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "shift_id")
    private Shift shift;

    @ManyToOne
    @JoinColumn(name = "terminal_id")
    private Terminal terminal;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Double quantity;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String failReason;

    public enum OrderStatus {
        PENDING, IN_TRANSIT, COMPLETED, FAILED
    }
}
