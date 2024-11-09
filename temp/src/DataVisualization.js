import React from 'react';
import { Line } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

const DataVisualization = ({ predictionData }) => {
    const chartData = {
        labels: predictionData.map((item, index) => `Data ${index + 1}`),
        datasets: [
            {
                label: 'Predicted Values',
                data: predictionData.map(item => item.value),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
            <div style={{ width: '45%' }}>
                <h3>Line Chart (Chart.js)</h3>
                <Line data={chartData} />
            </div>
            <div style={{ width: '45%' }}>
                <h3>Scatter Plot (Plotly.js)</h3>
                <Plot
                    data={[
                        {
                            x: predictionData.map((_, index) => index + 1),
                            y: predictionData.map(item => item.value),
                            type: 'scatter',
                            mode: 'markers',
                            marker: { color: 'blue' }
                        }
                    ]}
                    layout={{ title: 'Prediction Scatter Plot' }}
                />
            </div>
        </div>
    );
};

export default DataVisualization;
