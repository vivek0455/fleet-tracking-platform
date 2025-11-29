package com.fleetpanda.tracking.dto;

import com.fleetpanda.tracking.entity.Product;
import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private Product.ProductType type;
}
