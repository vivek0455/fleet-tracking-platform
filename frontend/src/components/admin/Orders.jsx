import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import {
    getShifts, getTerminals, getProducts, getOrders, createOrder
} from '../../services/api';

const Orders = () => {
    const [shifts, setShifts] = useState([]);
    const [terminals, setTerminals] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        shiftId: '',
        terminalId: '',
        productId: '',
        quantity: ''
    });

    const fetchData = async () => {
        try {
            const [shiftsRes, termRes, prodRes, ordersRes] = await Promise.all([
                getShifts(),
                getTerminals(),
                getProducts(),
                getOrders()
            ]);
            setShifts(shiftsRes.data);
            setTerminals(termRes.data);
            setProducts(prodRes.data);
            setOrders(ordersRes.data);
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
            await createOrder({
                shiftId: parseInt(formData.shiftId),
                terminalId: parseInt(formData.terminalId),
                productId: parseInt(formData.productId),
                quantity: parseFloat(formData.quantity)
            });
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order. Please try again.");
        }
    };

    const getShiftLabel = (shift) => {
        const driverName = shift.driver ? shift.driver.name : 'Unknown Driver';
        const vehiclePlate = shift.vehicle ? shift.vehicle.licensePlate : 'Unknown Vehicle';
        const status = shift.status;
        return `${driverName} - ${vehiclePlate} (${status})`;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Order Management</Typography>
                <Button variant="contained" onClick={handleOpen}>Create Order</Button>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Terminal</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.shift?.driver?.name || 'N/A'}</TableCell>
                                <TableCell>{order.shift?.vehicle?.licensePlate || 'N/A'}</TableCell>
                                <TableCell>{order.product?.name || 'N/A'}</TableCell>
                                <TableCell>{order.quantity} gal</TableCell>
                                <TableCell>{order.terminal?.name || 'N/A'}</TableCell>
                                <TableCell>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Shift (Driver/Vehicle)</InputLabel>
                        <Select
                            name="shiftId"
                            value={formData.shiftId}
                            label="Shift (Driver/Vehicle)"
                            onChange={handleChange}
                        >
                            {shifts.map((shift) => (
                                <MenuItem key={shift.id} value={shift.id}>
                                    {getShiftLabel(shift)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Destination Terminal</InputLabel>
                        <Select
                            name="terminalId"
                            value={formData.terminalId}
                            label="Destination Terminal"
                            onChange={handleChange}
                        >
                            {terminals.map((terminal) => (
                                <MenuItem key={terminal.id} value={terminal.id}>
                                    {terminal.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Product</InputLabel>
                        <Select
                            name="productId"
                            value={formData.productId}
                            label="Product"
                            onChange={handleChange}
                        >
                            {products.map((product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name} ({product.type})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Quantity (Gallons)"
                        type="number"
                        fullWidth
                        value={formData.quantity}
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

export default Orders;
