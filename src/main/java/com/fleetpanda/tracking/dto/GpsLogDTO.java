package com.fleetpanda.tracking.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GpsLogDTO {
    private Long vehicleId;
    private Double latitude;
    private Double longitude;
    private LocalDateTime timestamp;
}
