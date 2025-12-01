import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getFleetStatus } from '../../services/api';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const FleetMap = () => {
    const [vehicles, setVehicles] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getFleetStatus();
            setVehicles(res.data);
        } catch (error) {
            console.error("Error fetching fleet status:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Default center (Bangalore)
    const center = [12.9716, 77.5946];

    return (
        <Box sx={{ height: '600px', width: '100%' }}>
            <Typography variant="h6" gutterBottom>Real-time Fleet Map</Typography>
            <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {vehicles.map((log) => (
                    <Marker key={log.id} position={[log.latitude, log.longitude]}>
                        <Popup>
                            Vehicle: {log.vehicle.licensePlate} <br />
                            Last Update: {new Date(log.timestamp).toLocaleString()}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};

export default FleetMap;
