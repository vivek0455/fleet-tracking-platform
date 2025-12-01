import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import {
    getProducts, createProduct, getInventory,
    getHubs, getTerminals
} from '../../services/api';

const ProductsInventory = () => {
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [hubs, setHubs] = useState([]);
    const [terminals, setTerminals] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'DIESEL'
    });

    const fetchData = async () => {
        try {
            const [prodRes, invRes, hubsRes, termRes] = await Promise.all([
                getProducts(),
                getInventory(),
                getHubs(),
                getTerminals()
            ]);
            setProducts(prodRes.data);
            setInventory(invRes.data);
            setHubs(hubsRes.data);
            setTerminals(termRes.data);
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
            await createProduct(formData);
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const getLocationName = (id, type) => {
        if (type === 'HUB') {
            const hub = hubs.find(h => h.id === id);
            return hub ? `${hub.name} (Hub)` : `Hub #${id}`;
        } else {
            const terminal = terminals.find(t => t.id === id);
            return terminal ? `${terminal.name} (Terminal)` : `Terminal #${id}`;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Products & Inventory</Typography>
                <Button variant="contained" onClick={handleOpen}>Add Product</Button>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Products</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Inventory</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventory.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{getLocationName(item.locationId, item.locationType)}</TableCell>
                                        <TableCell>{item.product ? item.product.name : 'Unknown'}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={formData.type}
                            label="Type"
                            onChange={handleChange}
                        >
                            <MenuItem value="DIESEL">Diesel</MenuItem>
                            <MenuItem value="PETROL">Petrol</MenuItem>
                            <MenuItem value="OTHER">Other</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductsInventory;
