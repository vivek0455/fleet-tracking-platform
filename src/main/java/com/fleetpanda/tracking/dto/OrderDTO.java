package com.fleetpanda.tracking.dto;

import com.fleetpanda.tracking.entity.Order;
import lombok.Data;

@Data
public class OrderDTO {
    private Long id;
    private Long shiftId;
    private Long terminalId;
    private Long productId;
    private Double quantity;
    private Order.OrderStatus status;
    private String failReason;
}
