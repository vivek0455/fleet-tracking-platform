package com.fleetpanda.tracking.service;

import com.fleetpanda.tracking.entity.*;
import com.fleetpanda.tracking.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DriverServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private DriverService driverService;

    @Test
    void completeDelivery_UpdatesInventory() {
        Order order = new Order();
        order.setId(1L);
        order.setStatus(Order.OrderStatus.IN_TRANSIT);
        order.setQuantity(100.0);

        Terminal terminal = new Terminal();
        terminal.setId(1L);
        order.setTerminal(terminal);

        Product product = new Product();
        product.setId(1L);
        order.setProduct(product);

        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(inventoryRepository.findByLocationIdAndLocationTypeAndProductId(any(), any(), any()))
                .thenReturn(Optional.empty()); // New inventory
        when(inventoryRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Order result = driverService.completeDelivery(1L);

        assertEquals(Order.OrderStatus.COMPLETED, result.getStatus());
        verify(inventoryRepository).save(any());
    }
}
