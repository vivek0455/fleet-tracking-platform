package com.fleetpanda.tracking.dto;

import lombok.Data;

@Data
public class TerminalDTO {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
}
