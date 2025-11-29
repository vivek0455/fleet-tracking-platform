package com.fleetpanda.tracking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Terminal extends BaseEntity {
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
}
