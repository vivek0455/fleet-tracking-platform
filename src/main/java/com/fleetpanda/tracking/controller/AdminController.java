package com.fleetpanda.tracking.controller;

import com.fleetpanda.tracking.dto.*;
import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Allow frontend access
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/hubs")
    public ResponseEntity<Hub> createHub(@RequestBody HubDTO dto) {
        return ResponseEntity.ok(adminService.createHub(dto));
    }

    @GetMapping("/hubs")
    public ResponseEntity<List<Hub>> getAllHubs() {
        return ResponseEntity.ok(adminService.getAllHubs());
    }

    @PostMapping("/terminals")
    public ResponseEntity<Terminal> createTerminal(@RequestBody TerminalDTO dto) {
        return ResponseEntity.ok(adminService.createTerminal(dto));
    }

    @GetMapping("/terminals")
    public ResponseEntity<List<Terminal>> getAllTerminals() {
        return ResponseEntity.ok(adminService.getAllTerminals());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO dto) {
        return ResponseEntity.ok(adminService.createProduct(dto));
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(adminService.getAllProducts());
    }

    @PostMapping("/drivers")
    public ResponseEntity<Driver> createDriver(@RequestBody DriverDTO dto) {
        return ResponseEntity.ok(adminService.createDriver(dto));
    }

    @GetMapping("/drivers")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(adminService.getAllDrivers());
    }

    @PostMapping("/vehicles")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody VehicleDTO dto) {
        return ResponseEntity.ok(adminService.createVehicle(dto));
    }

    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(adminService.getAllVehicles());
    }

    @PostMapping("/allocations")
    public ResponseEntity<VehicleAllocation> allocateVehicle(@RequestBody VehicleAllocationDTO dto) {
        return ResponseEntity.ok(adminService.allocateVehicle(dto));
    }

    @GetMapping("/allocations")
    public ResponseEntity<List<VehicleAllocation>> getAllocations() {
        return ResponseEntity.ok(adminService.getAllocations(null));
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO dto) {
        return ResponseEntity.ok(adminService.createOrder(dto));
    }
}
