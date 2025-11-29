package com.fleetpanda.tracking.dto;

import com.fleetpanda.tracking.entity.Shift;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ShiftDTO {
    private Long id;
    private Long driverId;
    private Long vehicleId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Shift.ShiftStatus status;
}
