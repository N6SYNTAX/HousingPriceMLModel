import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

function UserInputForm() {
    const [bedrooms, setBedrooms] = useState("");
    const [landsize, setLandsize] = useState("");
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bedrooms: parseInt(bedrooms),
                    landsize: parseFloat(landsize),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            setPredictedPrice(data.predicted_price);
            setError(null);
        } catch (err) {
            setError("An error occurred while fetching the prediction.");
            setPredictedPrice(null);
        }
    };

    const handleBedroomsChange = (e) => setBedrooms(e.target.value);
    const handleLandsizeChange = (e) => setLandsize(e.target.value);

    return (
        <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: '400px' }}>
            <Typography variant="h6">Enter Features</Typography>
            <TextField
                label="Number of Bedrooms"
                variant="outlined"
                value={bedrooms}
                onChange={handleBedroomsChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Land Size (m2)"
                variant="outlined"
                value={landsize}
                onChange={handleLandsizeChange}
                required
                fullWidth
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            {predictedPrice !== null && (
                <Typography variant="h6" color="primary">
                    Predicted Price: ${predictedPrice}
                </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </form>
    );
}

export default UserInputForm;

