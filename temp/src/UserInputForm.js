import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const UserInputForm = ({ onPredict }) => {
    const [bedrooms, setBedrooms] = useState('');
    const [landsize, setLandsize] = useState('');
    const [predictedPrice, setPredictedPrice] = useState(null); // New state for predicted price

    const handlePredict = () => {
        // Calculate a mock predicted price
        const price = parseFloat(bedrooms) * 100000 + parseFloat(landsize) * 500;
        setPredictedPrice(price);

        // Generate mock data for visualization
        const mockPredictionData = [
            { x: parseFloat(landsize), y: price },
            { x: parseFloat(landsize) * 1.1, y: price * 1.05 },
        ];

        // Pass data to App component for visualization
        onPredict(mockPredictionData);
    };

    return (
        <Box>
            <TextField
                label="Number of Bedrooms"
                variant="outlined"
                fullWidth
                margin="normal"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
            />
            <TextField
                label="Landsize (sqm)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={landsize}
                onChange={(e) => setLandsize(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handlePredict} sx={{ mt: 2 }}>
                Predict
            </Button>

            {/* Display the predicted price */}
            {predictedPrice !== null && (
                <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 2 }}>
                    Predicted Price: ${predictedPrice.toLocaleString()}
                </Typography>
            )}
        </Box>
    );
};

export default UserInputForm;
