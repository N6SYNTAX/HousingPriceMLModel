import React from 'react';
import Plot from 'react-plotly.js';

const DataVisualization = ({ predictionData }) => {
    // Extract data for the scatter plots
    const landsizeValues = predictionData.map(point => point.x); // Landsize values
    const priceValues = predictionData.map(point => point.y); // Predicted Price values
    const bedroomCounts = predictionData.map((_, index) => index + 1); // Mock Bedroom Count

    // Calculate linear regression line for Landsize vs Predicted Price
    const calcRegressionLine = (x, y) => {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
        const sumX2 = x.map(xi => xi ** 2).reduce((a, b) => a + b, 0);

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
        const intercept = (sumY - slope * sumX) / n;

        return x.map(xi => slope * xi + intercept); // y values of regression line
    };

    const regressionLineValues = calcRegressionLine(landsizeValues, priceValues);

    return (
        <div>
            <h2>Prediction Data Visualization</h2>

            {/* Scatter Plot with Regression Line: Landsize vs Predicted Price */}
            <Plot
                data={[
                    {
                        x: landsizeValues,
                        y: priceValues,
                        type: 'scatter',
                        mode: 'markers',
                        marker: { color: 'blue' },
                        name: 'Data Points',
                    },
                    {
                        x: landsizeValues,
                        y: regressionLineValues,
                        type: 'scatter',
                        mode: 'lines',
                        line: { color: 'red' },
                        name: 'Regression Line',
                    },
                ]}
                layout={{
                    title: 'Landsize vs Predicted Price with Regression Line',
                    xaxis: { title: 'Landsize (sqm)' },
                    yaxis: { title: 'Predicted Price ($)' },
                }}
            />

            {/* Scatter Plot: Number of Bedrooms vs Predicted Price */}
            <Plot
                data={[
                    {
                        x: bedroomCounts,
                        y: priceValues,
                        type: 'scatter',
                        mode: 'markers',
                        marker: { color: 'green' },
                    },
                ]}
                layout={{
                    title: 'Number of Bedrooms vs Predicted Price',
                    xaxis: { title: 'Number of Bedrooms' },
                    yaxis: { title: 'Predicted Price ($)' },
                }}
            />
        </div>
    );
};

export default DataVisualization;
