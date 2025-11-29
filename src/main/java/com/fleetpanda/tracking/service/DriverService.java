package com.fleetpanda.tracking.service;

import com.fleetpanda.tracking.dto.*;
import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final ShiftRepository shiftRepository;
    private final VehicleAllocationRepository allocationRepository;
    private final DriverRepository driverRepository;
    private final OrderRepository orderRepository;
    private final InventoryRepository inventoryRepository;
    private final GpsLogRepository gpsLogRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final VehicleRepository vehicleRepository;

    @Transactional
    public Shift startShift(Long driverId) {
        // Check if there is an active shift
        if (shiftRepository.findByDriverIdAndStatus(driverId, Shift.ShiftStatus.ACTIVE).isPresent()) {
            throw new RuntimeException("Driver already has an active shift");
        }

        // Check for vehicle allocation for today
        VehicleAllocation allocation = allocationRepository.findByDriverIdAndDate(driverId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No vehicle allocated for today"));

        Shift shift = new Shift();
        shift.setDriver(allocation.getDriver());
        shift.setVehicle(allocation.getVehicle());
        shift.setStartTime(LocalDateTime.now());
        shift.setStatus(Shift.ShiftStatus.ACTIVE);

        return shiftRepository.save(shift);
    }

    @Transactional
    public Shift endShift(Long shiftId) {
        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new RuntimeException("Shift not found"));

        shift.setEndTime(LocalDateTime.now());
        shift.setStatus(Shift.ShiftStatus.COMPLETED);

        // Logic to handle incomplete deliveries?
        // For now, just end the shift.

        return shiftRepository.save(shift);
    }

    public Shift getActiveShift(Long driverId) {
        return shiftRepository.findByDriverIdAndStatus(driverId, Shift.ShiftStatus.ACTIVE)
                .orElse(null);
    }

    public List<Order> getShiftOrders(Long shiftId) {
        return orderRepository.findByShiftId(shiftId);
    }

    @Transactional
    public Order completeDelivery(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != Order.OrderStatus.IN_TRANSIT && order.getStatus() != Order.OrderStatus.PENDING) {
            // Allow completing from PENDING for simplicity if they skip IN_TRANSIT
        }

        order.setStatus(Order.OrderStatus.COMPLETED);
        orderRepository.save(order);

        // Update Inventory
        updateInventory(order.getTerminal(), order.getProduct(), order.getQuantity());

        return order;
    }

    @Transactional
    public Order failDelivery(Long orderId, String reason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(Order.OrderStatus.FAILED);
        order.setFailReason(reason);

        return orderRepository.save(order);
    }

    private void updateInventory(Terminal terminal, Product product, Double quantity) {
        Inventory inventory = inventoryRepository.findByLocationIdAndLocationTypeAndProductId(
                terminal.getId(), Inventory.LocationType.TERMINAL, product.getId())
                .orElse(new Inventory());

        if (inventory.getId() == null) {
            inventory.setLocationId(terminal.getId());
            inventory.setLocationType(Inventory.LocationType.TERMINAL);
            inventory.setProduct(product);
            inventory.setQuantity(0.0);
        }

        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventoryRepository.save(inventory);
    }

    public void sendGpsUpdate(GpsLogDTO dto) {
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        GpsLog log = new GpsLog();
        log.setVehicle(vehicle);
        log.setLatitude(dto.getLatitude());
        log.setLongitude(dto.getLongitude());
        log.setTimestamp(dto.getTimestamp() != null ? dto.getTimestamp() : LocalDateTime.now());

        gpsLogRepository.save(log);

        // Optional: Send to Kafka
        // kafkaTemplate.send("gps-updates", dto.toString());
    }
}
