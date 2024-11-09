import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const UserInputForm = ({ onPrediction }) => {
    const [inputData, setInputData] = useState({ feature1: '', feature2: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!inputData.feature1 || !inputData.feature2) {
            setError('All fields are required.');
            return;
        }
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/predict', inputData);
            onPrediction(response.data);
        } catch (err) {
            console.error(err);
            setError('Error retrieving data.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: '400px' }}>
            <Typography variant="h6">Enter Features</Typography>
            <TextField
                name="feature1"
                label="Number of Bedrooms"
                variant="outlined"
                value={inputData.feature1}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                name="feature2"
                label="Land Size (m2)"
                variant="outlined"
                value={inputData.feature2}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
        </form>
    );
};

export default UserInputForm;
