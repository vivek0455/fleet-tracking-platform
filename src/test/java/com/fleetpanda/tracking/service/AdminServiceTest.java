package com.fleetpanda.tracking.service;

import com.fleetpanda.tracking.dto.VehicleAllocationDTO;
import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private VehicleAllocationRepository allocationRepository;
    @Mock
    private DriverRepository driverRepository;
    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private AdminService adminService;

    @Test
    void allocateVehicle_Success() {
        VehicleAllocationDTO dto = new VehicleAllocationDTO();
        dto.setDriverId(1L);
        dto.setVehicleId(1L);
        dto.setDate(LocalDate.now());

        when(allocationRepository.findByVehicleIdAndDate(any(), any())).thenReturn(Optional.empty());
        when(allocationRepository.findByDriverIdAndDate(any(), any())).thenReturn(Optional.empty());
        when(driverRepository.findById(1L)).thenReturn(Optional.of(new Driver()));
        when(vehicleRepository.findById(1L)).thenReturn(Optional.of(new Vehicle()));
        when(allocationRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        VehicleAllocation result = adminService.allocateVehicle(dto);

        assertNotNull(result);
        assertEquals(dto.getDate(), result.getDate());
    }

    @Test
    void allocateVehicle_Conflict() {
        VehicleAllocationDTO dto = new VehicleAllocationDTO();
        dto.setDriverId(1L);
        dto.setVehicleId(1L);
        dto.setDate(LocalDate.now());

        when(allocationRepository.findByVehicleIdAndDate(any(), any()))
                .thenReturn(Optional.of(new VehicleAllocation()));

        assertThrows(RuntimeException.class, () -> adminService.allocateVehicle(dto));
    }
}
