# Fleet Tracking Platform

A real-time fleet, driver, and delivery tracking platform backend.

## Requirements
- Java 17+
- Docker & Docker Compose
- Maven

## Setup & Run

1. **Start Infrastructure**
   ```bash
   docker-compose up -d
   ```

2. **Build Application**
   ```bash
   mvn clean package
   ```

3. **Run Application**
   ```bash
   java -jar target/tracking-0.0.1-SNAPSHOT.jar
   ```

## API Documentation
The API provides endpoints for Admin and Driver operations.

### Admin APIs
- `POST /api/admin/hubs`: Create Hub
- `POST /api/admin/terminals`: Create Terminal
- `POST /api/admin/products`: Create Product
- `POST /api/admin/drivers`: Create Driver
- `POST /api/admin/vehicles`: Create Vehicle
- `POST /api/admin/allocations`: Allocate Vehicle to Driver
- `POST /api/admin/orders`: Create Order

### Driver APIs
- `POST /api/driver/{driverId}/shift/start`: Start Shift
- `POST /api/driver/shift/{shiftId}/end`: End Shift
- `POST /api/driver/orders/{orderId}/complete`: Complete Delivery
- `POST /api/driver/orders/{orderId}/fail`: Fail Delivery
- `POST /api/driver/gps`: Send GPS Update

## Testing
Run unit tests with:
```bash
mvn test
```
