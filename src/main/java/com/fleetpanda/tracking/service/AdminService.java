package com.fleetpanda.tracking.service;

import com.fleetpanda.tracking.dto.*;
import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final HubRepository hubRepository;
    private final TerminalRepository terminalRepository;
    private final ProductRepository productRepository;
    private final DriverRepository driverRepository;
    private final VehicleRepository vehicleRepository;
    private final VehicleAllocationRepository allocationRepository;
    private final OrderRepository orderRepository;
    private final ShiftRepository shiftRepository;

    // Hubs
    public Hub createHub(HubDTO dto) {
        Hub hub = new Hub();
        hub.setName(dto.getName());
        hub.setAddress(dto.getAddress());
        hub.setLatitude(dto.getLatitude());
        hub.setLongitude(dto.getLongitude());
        return hubRepository.save(hub);
    }

    public List<Hub> getAllHubs() {
        return hubRepository.findAll();
    }

    // Terminals
    public Terminal createTerminal(TerminalDTO dto) {
        Terminal terminal = new Terminal();
        terminal.setName(dto.getName());
        terminal.setAddress(dto.getAddress());
        terminal.setLatitude(dto.getLatitude());
        terminal.setLongitude(dto.getLongitude());
        return terminalRepository.save(terminal);
    }

    public List<Terminal> getAllTerminals() {
        return terminalRepository.findAll();
    }

    // Products
    public Product createProduct(ProductDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setType(dto.getType());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Drivers
    public Driver createDriver(DriverDTO dto) {
        Driver driver = new Driver();
        driver.setName(dto.getName());
        driver.setLicenseNumber(dto.getLicenseNumber());
        driver.setStatus(Driver.DriverStatus.ACTIVE);
        return driverRepository.save(driver);
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Vehicles
    public Vehicle createVehicle(VehicleDTO dto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setLicensePlate(dto.getLicensePlate());
        vehicle.setCapacity(dto.getCapacity());
        vehicle.setStatus(Vehicle.VehicleStatus.AVAILABLE);
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    // Allocation
    @Transactional
    public VehicleAllocation allocateVehicle(VehicleAllocationDTO dto) {
        // Check if vehicle is already allocated for the day
        if (allocationRepository.findByVehicleIdAndDate(dto.getVehicleId(), dto.getDate()).isPresent()) {
            throw new RuntimeException("Vehicle is already allocated for this date");
        }

        // Check if driver is already allocated for the day
        if (allocationRepository.findByDriverIdAndDate(dto.getDriverId(), dto.getDate()).isPresent()) {
            throw new RuntimeException("Driver is already allocated for this date");
        }

        Driver driver = driverRepository.findById(dto.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        VehicleAllocation allocation = new VehicleAllocation();
        allocation.setDriver(driver);
        allocation.setVehicle(vehicle);
        allocation.setDate(dto.getDate());

        return allocationRepository.save(allocation);
    }

    public List<VehicleAllocation> getAllocations(LocalDate date) {
        // For simplicity returning all, but ideally filter by date if provided
        return allocationRepository.findAll();
    }

    // Orders
    @Transactional
    public Order createOrder(OrderDTO dto) {
        // Ideally we should check if the shift exists and is valid
        // But for now, we might create orders before shift starts, or assign to a
        // driver/vehicle directly?
        // The prompt says "Create and assign orders to drivers".
        // Let's assume we assign to a Shift (which is Driver + Vehicle + Date).
        // If Shift doesn't exist yet, maybe we just store it?
        // But Order entity has Shift relationship.
        // Let's assume the admin selects a Shift or we create a Shift placeholder?
        // Or maybe Order is assigned to a Driver for a Date?

        // Let's stick to the entity: Order -> Shift.
        // So we need a Shift ID.

        Shift shift = shiftRepository.findById(dto.getShiftId())
                .orElseThrow(() -> new RuntimeException("Shift not found"));

        Terminal terminal = terminalRepository.findById(dto.getTerminalId())
                .orElseThrow(() -> new RuntimeException("Terminal not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Order order = new Order();
        order.setShift(shift);
        order.setTerminal(terminal);
        order.setProduct(product);
        order.setQuantity(dto.getQuantity());
        order.setStatus(Order.OrderStatus.PENDING);

        return orderRepository.save(order);
    }
}
