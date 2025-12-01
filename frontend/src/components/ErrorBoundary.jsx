import React from 'react';
import { Box, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 3, color: 'error.main' }}>
                    <Typography variant="h5">Something went wrong.</Typography>
                    <Typography variant="body1">{this.state.error && this.state.error.toString()}</Typography>
                    <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
