import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHubs = () => api.get('/admin/hubs');
export const createHub = (data) => api.post('/admin/hubs', data);

export const getTerminals = () => api.get('/admin/terminals');
export const createTerminal = (data) => api.post('/admin/terminals', data);

export const getProducts = () => api.get('/admin/products');
export const createProduct = (data) => api.post('/admin/products', data);

export const getInventory = () => api.get('/admin/inventory');

export const getDrivers = () => api.get('/admin/drivers');
export const createDriver = (data) => api.post('/admin/drivers', data);

export const getVehicles = () => api.get('/admin/vehicles');
export const createVehicle = (data) => api.post('/admin/vehicles', data);

export const getAllocations = () => api.get('/admin/allocations');
export const allocateVehicle = (data) => api.post('/admin/allocations', data);

export const getShifts = () => api.get('/admin/shifts');
export const getFleetStatus = () => api.get('/admin/fleet-status');
export const getOrders = () => api.get('/admin/orders');
export const createOrder = (data) => api.post('/admin/orders', data);

export default api;
