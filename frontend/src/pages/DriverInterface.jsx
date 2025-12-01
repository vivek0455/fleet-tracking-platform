import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Select, MenuItem, FormControl, InputLabel,
    Card, CardContent, CardActions, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions, Grid
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
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

const API_URL = 'http://localhost:8080/api';

const DriverInterface = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [activeShift, setActiveShift] = useState(null);
    const [orders, setOrders] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Default Bangalore
    const [failReason, setFailReason] = useState('');
    const [failOrderId, setFailOrderId] = useState(null);
    const [openFailDialog, setOpenFailDialog] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDrivers();
    }, []);

    useEffect(() => {
        if (selectedDriver) {
            fetchActiveShift(selectedDriver);
        }
    }, [selectedDriver]);

    useEffect(() => {
        if (activeShift) {
            fetchOrders(activeShift.id);
        }
    }, [activeShift]);

    const fetchDrivers = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/drivers`);
            setDrivers(res.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching drivers:", error);
            setError("Failed to fetch drivers. Ensure backend is running.");
        }
    };

    const fetchActiveShift = async (driverId) => {
        try {
            const res = await axios.get(`${API_URL}/driver/${driverId}/shift/active`);
            setActiveShift(res.data); // Might be empty if no active shift
        } catch (error) {
            console.error("Error fetching active shift:", error);
            setActiveShift(null);
        }
    };

    const fetchOrders = async (shiftId) => {
        try {
            const res = await axios.get(`${API_URL}/driver/shift/${shiftId}/orders`);
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const startShift = async () => {
        try {
            const res = await axios.post(`${API_URL}/driver/${selectedDriver}/shift/start`);
            setActiveShift(res.data);
        } catch (error) {
            console.error("Error starting shift:", error);
            alert("Failed to start shift. Ensure vehicle is allocated.");
        }
    };

    const endShift = async () => {
        if (!activeShift) return;
        try {
            await axios.post(`${API_URL}/driver/shift/${activeShift.id}/end`);
            setActiveShift(null);
            setOrders([]);
        } catch (error) {
            console.error("Error ending shift:", error);
        }
    };

    const completeDelivery = async (orderId) => {
        try {
            await axios.post(`${API_URL}/driver/orders/${orderId}/complete`);
            fetchOrders(activeShift.id);
        } catch (error) {
            console.error("Error completing delivery:", error);
        }
    };

    const failDelivery = async () => {
        try {
            await axios.post(`${API_URL}/driver/orders/${failOrderId}/fail`, null, {
                params: { reason: failReason }
            });
            fetchOrders(activeShift.id);
            setOpenFailDialog(false);
            setFailReason('');
            setFailOrderId(null);
        } catch (error) {
            console.error("Error failing delivery:", error);
        }
    };

    const sendGpsUpdate = async () => {
        if (!activeShift || !activeShift.vehicle) return;

        // Simulate movement
        const newLat = currentLocation.lat + (Math.random() - 0.5) * 0.01;
        const newLng = currentLocation.lng + (Math.random() - 0.5) * 0.01;
        setCurrentLocation({ lat: newLat, lng: newLng });

        try {
            await axios.post(`${API_URL}/driver/gps`, {
                vehicleId: activeShift.vehicle.id,
                latitude: newLat,
                longitude: newLng,
                timestamp: new Date().toISOString()
            });
            alert("GPS Update Sent!");
        } catch (error) {
            console.error("Error sending GPS update:", error);
        }
    };

    if (!selectedDriver) {
        return (
            <Box sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 10 }}>
                <Typography variant="h5" gutterBottom>Driver Login</Typography>
                <FormControl fullWidth>
                    <InputLabel>Select Driver</InputLabel>
                    <Select
                        value={selectedDriver}
                        label="Select Driver"
                        onChange={(e) => setSelectedDriver(e.target.value)}
                    >
                        {drivers.map((driver) => (
                            <MenuItem key={driver.id} value={driver.id}>
                                {driver.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                    Welcome, {drivers.find(d => d.id === selectedDriver)?.name}
                </Typography>
                <Button color="inherit" onClick={() => setSelectedDriver('')}>Logout</Button>
            </Box>

            {!activeShift ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h6" gutterBottom>No Active Shift</Typography>
                    <Button variant="contained" size="large" onClick={startShift}>
                        Start Shift
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Current Shift</Typography>
                                <Typography>Vehicle: {activeShift.vehicle?.licensePlate}</Typography>
                                <Typography>Start Time: {new Date(activeShift.startTime).toLocaleString()}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button variant="contained" color="primary" onClick={sendGpsUpdate}>
                                        Send GPS Update
                                    </Button>
                                    <Button variant="contained" color="error" onClick={endShift}>
                                        End Shift
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>Assigned Orders</Typography>
                        {orders.length === 0 ? (
                            <Typography>No orders assigned.</Typography>
                        ) : (
                            orders.map((order) => (
                                <Card key={order.id} sx={{ mb: 2 }}>
                                    <CardContent>
                                        <Typography variant="subtitle1">
                                            Order #{order.id} - {order.status}
                                        </Typography>
                                        <Typography>
                                            Product: {order.product?.name} ({order.quantity} gal)
                                        </Typography>
                                        <Typography>
                                            Destination: {order.terminal?.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {order.terminal?.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {order.status === 'PENDING' || order.status === 'IN_TRANSIT' ? (
                                            <>
                                                <Button size="small" onClick={() => completeDelivery(order.id)}>
                                                    Complete
                                                </Button>
                                                <Button size="small" color="error" onClick={() => {
                                                    setFailOrderId(order.id);
                                                    setOpenFailDialog(true);
                                                }}>
                                                    Fail
                                                </Button>
                                            </>
                                        ) : null}
                                    </CardActions>
                                </Card>
                            ))
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Current Location</Typography>
                        <Box sx={{ height: 400 }}>
                            <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[currentLocation.lat, currentLocation.lng]}>
                                    <Popup>You are here</Popup>
                                </Marker>
                            </MapContainer>
                        </Box>
                    </Grid>
                </Grid>
            )}

            <Dialog open={openFailDialog} onClose={() => setOpenFailDialog(false)}>
                <DialogTitle>Fail Delivery</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Reason"
                        fullWidth
                        value={failReason}
                        onChange={(e) => setFailReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFailDialog(false)}>Cancel</Button>
                    <Button onClick={failDelivery} color="error">Fail Order</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DriverInterface;
