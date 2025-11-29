package com.fleetpanda.tracking.controller;

import com.fleetpanda.tracking.dto.*;
import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DriverController {

    private final DriverService driverService;

    @PostMapping("/{driverId}/shift/start")
    public ResponseEntity<Shift> startShift(@PathVariable Long driverId) {
        return ResponseEntity.ok(driverService.startShift(driverId));
    }

    @PostMapping("/shift/{shiftId}/end")
    public ResponseEntity<Shift> endShift(@PathVariable Long shiftId) {
        return ResponseEntity.ok(driverService.endShift(shiftId));
    }

    @GetMapping("/{driverId}/shift/active")
    public ResponseEntity<Shift> getActiveShift(@PathVariable Long driverId) {
        return ResponseEntity.ok(driverService.getActiveShift(driverId));
    }

    @GetMapping("/shift/{shiftId}/orders")
    public ResponseEntity<List<Order>> getShiftOrders(@PathVariable Long shiftId) {
        return ResponseEntity.ok(driverService.getShiftOrders(shiftId));
    }

    @PostMapping("/orders/{orderId}/complete")
    public ResponseEntity<Order> completeDelivery(@PathVariable Long orderId) {
        return ResponseEntity.ok(driverService.completeDelivery(orderId));
    }

    @PostMapping("/orders/{orderId}/fail")
    public ResponseEntity<Order> failDelivery(@PathVariable Long orderId, @RequestParam String reason) {
        return ResponseEntity.ok(driverService.failDelivery(orderId, reason));
    }

    @PostMapping("/gps")
    public ResponseEntity<Void> sendGpsUpdate(@RequestBody GpsLogDTO dto) {
        driverService.sendGpsUpdate(dto);
        return ResponseEntity.ok().build();
    }
}
