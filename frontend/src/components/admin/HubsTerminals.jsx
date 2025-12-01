import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import { getHubs, getTerminals, createHub, createTerminal } from '../../services/api';

const HubsTerminals = () => {
    const [hubs, setHubs] = useState([]);
    const [terminals, setTerminals] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('HUB'); // HUB or TERMINAL
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const hubsRes = await getHubs();
            setHubs(hubsRes.data);
            const terminalsRes = await getTerminals();
            setTerminals(terminalsRes.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch data. Ensure backend is running.");
        } finally {
            setLoading(false);
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
            const payload = {
                name: formData.name,
                address: formData.address,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude)
            };

            if (type === 'HUB') {
                await createHub(payload);
            } else {
                await createTerminal(payload);
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error creating location:", error);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Hubs & Terminals</Typography>
                <Button variant="contained" onClick={handleOpen}>Add Location</Button>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Hubs</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Lat/Long</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hubs.map((hub) => (
                                    <TableRow key={hub.id}>
                                        <TableCell>{hub.name}</TableCell>
                                        <TableCell>{hub.address}</TableCell>
                                        <TableCell>{hub.latitude}, {hub.longitude}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Terminals</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Lat/Long</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {terminals.map((terminal) => (
                                    <TableRow key={terminal.id}>
                                        <TableCell>{terminal.name}</TableCell>
                                        <TableCell>{terminal.address}</TableCell>
                                        <TableCell>{terminal.latitude}, {terminal.longitude}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            label="Type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="HUB">Hub</MenuItem>
                            <MenuItem value="TERMINAL">Terminal</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        fullWidth
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="latitude"
                        label="Latitude"
                        type="number"
                        fullWidth
                        value={formData.latitude}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="longitude"
                        label="Longitude"
                        type="number"
                        fullWidth
                        value={formData.longitude}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HubsTerminals;
