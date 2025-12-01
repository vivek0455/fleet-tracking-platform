import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import HubsTerminals from '../components/admin/HubsTerminals';
import ProductsInventory from '../components/admin/ProductsInventory';
import DriversVehicles from '../components/admin/DriversVehicles';
import Orders from '../components/admin/Orders';
import Allocations from '../components/admin/Allocations';
import FleetMap from '../components/admin/FleetMap';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AdminDashboard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="admin dashboard tabs">
                    <Tab label="Hubs & Terminals" />
                    <Tab label="Products & Inventory" />
                    <Tab label="Drivers & Vehicles" />
                    <Tab label="Orders" />
                    <Tab label="Allocations" />
                    <Tab label="Fleet Map" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <HubsTerminals />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductsInventory />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DriversVehicles />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Orders />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Allocations />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <FleetMap />
            </TabPanel>
        </Box>
    );
};

export default AdminDashboard;
