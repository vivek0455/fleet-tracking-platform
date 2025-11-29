# Technical Decisions & Trade-offs

## Architecture
- **Spring Boot**: Chosen for robust dependency injection, easy REST API creation, and strong ecosystem.
- **PostgreSQL**: Relational database suitable for structured data like orders, inventory, and allocations.
- **Kafka**: Included for GPS ingestion to demonstrate scalability for high-throughput data, though currently the consumer logic is simplified.

## Database Design
- **VehicleAllocation**: Enforces unique constraints on `(vehicle_id, date)` and `(driver_id, date)` to prevent double booking.
- **Inventory**: Tracks quantity per product per location. Updated transactionally when orders are completed.

## Trade-offs & Assumptions
- **Authentication**: Skipped as per "Out of Scope" requirements.
- **GPS Ingestion**: Currently saves directly to DB for simplicity in the "Real-time fleet status" view. In a production system, this would flow Kafka -> Stream Processing -> DB/Cache.
- **Shift Validation**: Simplified to check for active shifts. Complex rules like rest periods are omitted.
- **DTOs**: Used to decouple API contract from Database Entities.

## Future Improvements
- Implement the Kafka consumer for GPS logs.
- Add real-time WebSocket updates for the frontend map.
- Add authentication (JWT).
