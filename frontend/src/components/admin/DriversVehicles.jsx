import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Grid
} from '@mui/material';
import {
    getDrivers, createDriver, getVehicles, createVehicle
} from '../../services/api';

const DriversVehicles = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [openDriver, setOpenDriver] = useState(false);
    const [openVehicle, setOpenVehicle] = useState(false);

    const [driverForm, setDriverForm] = useState({
        name: '',
        licenseNumber: ''
    });

    const [vehicleForm, setVehicleForm] = useState({
        licensePlate: '',
        capacity: ''
    });

    const fetchData = async () => {
        try {
            const [driversRes, vehiclesRes] = await Promise.all([
                getDrivers(),
                getVehicles()
            ]);
            setDrivers(driversRes.data);
            setVehicles(vehiclesRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateDriver = async () => {
        try {
            await createDriver(driverForm);
            fetchData();
            setOpenDriver(false);
            setDriverForm({ name: '', licenseNumber: '' });
        } catch (error) {
            console.error("Error creating driver:", error);
        }
    };

    const handleCreateVehicle = async () => {
        try {
            await createVehicle({
                ...vehicleForm,
                capacity: parseFloat(vehicleForm.capacity)
            });
            fetchData();
            setOpenVehicle(false);
            setVehicleForm({ licensePlate: '', capacity: '' });
        } catch (error) {
            console.error("Error creating vehicle:", error);
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Drivers</Typography>
                        <Button variant="contained" onClick={() => setOpenDriver(true)}>Add Driver</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>License</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drivers.map((driver) => (
                                    <TableRow key={driver.id}>
                                        <TableCell>{driver.name}</TableCell>
                                        <TableCell>{driver.licenseNumber}</TableCell>
                                        <TableCell>{driver.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Vehicles</Typography>
                        <Button variant="contained" onClick={() => setOpenVehicle(true)}>Add Vehicle</Button>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>License Plate</TableCell>
                                    <TableCell>Capacity</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell>{vehicle.licensePlate}</TableCell>
                                        <TableCell>{vehicle.capacity}</TableCell>
                                        <TableCell>{vehicle.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            {/* Driver Dialog */}
            <Dialog open={openDriver} onClose={() => setOpenDriver(false)}>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={driverForm.name}
                        onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="License Number"
                        fullWidth
                        value={driverForm.licenseNumber}
                        onChange={(e) => setDriverForm({ ...driverForm, licenseNumber: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDriver(false)}>Cancel</Button>
                    <Button onClick={handleCreateDriver} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            {/* Vehicle Dialog */}
            <Dialog open={openVehicle} onClose={() => setOpenVehicle(false)}>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="License Plate"
                        fullWidth
                        value={vehicleForm.licensePlate}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, licensePlate: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Capacity"
                        type="number"
                        fullWidth
                        value={vehicleForm.capacity}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, capacity: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenVehicle(false)}>Cancel</Button>
                    <Button onClick={handleCreateVehicle} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DriversVehicles;
