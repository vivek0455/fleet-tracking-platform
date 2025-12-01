import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
    getDrivers, getVehicles, getAllocations, allocateVehicle
} from '../../services/api';

const Allocations = () => {
    const [allocations, setAllocations] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        driverId: '',
        vehicleId: '',
        date: new Date().toISOString().split('T')[0] // Default to today
    });

    const fetchData = async () => {
        try {
            const [allocRes, driversRes, vehiclesRes] = await Promise.all([
                getAllocations(),
                getDrivers(),
                getVehicles()
            ]);
            setAllocations(allocRes.data);
            setDrivers(driversRes.data);
            setVehicles(vehiclesRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await allocateVehicle({
                driverId: parseInt(formData.driverId),
                vehicleId: parseInt(formData.vehicleId),
                date: formData.date
            });
            fetchData();
            handleClose();
            setFormData({
                driverId: '',
                vehicleId: '',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error("Error allocating vehicle:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to allocate vehicle";
            alert(errorMessage);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Vehicle Allocations</Typography>
                <Button variant="contained" onClick={handleOpen}>Allocate Vehicle</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell>Vehicle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allocations.map((allocation) => (
                            <TableRow key={allocation.id}>
                                <TableCell>{allocation.date}</TableCell>
                                <TableCell>{allocation.driver ? allocation.driver.name : 'Unknown'}</TableCell>
                                <TableCell>{allocation.vehicle ? allocation.vehicle.licensePlate : 'Unknown'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Allocate Vehicle</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="date"
                        label="Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={handleChange}
                    />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Driver</InputLabel>
                        <Select
                            name="driverId"
                            value={formData.driverId}
                            label="Driver"
                            onChange={handleChange}
                        >
                            {drivers.map((driver) => (
                                <MenuItem key={driver.id} value={driver.id}>
                                    {driver.name} ({driver.status})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Vehicle</InputLabel>
                        <Select
                            name="vehicleId"
                            value={formData.vehicleId}
                            label="Vehicle"
                            onChange={handleChange}
                        >
                            {vehicles.map((vehicle) => (
                                <MenuItem key={vehicle.id} value={vehicle.id}>
                                    {vehicle.licensePlate} ({vehicle.status})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Allocate</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Allocations;
