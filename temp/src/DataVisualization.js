// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// const DataVisualization = () => {
//     const [clusterData, setClusterData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from the /visualize/clusters endpoint
//         const fetchClusterData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/visualize/clusters');
//                 console.log("Fetched Cluster Data:", response.data.data);  // Log full response data

//                 if (response.data && response.data.data && Array.isArray(response.data.data)) {
//                     setClusterData(response.data.data);
//                     console.log("Cluster data set successfully:", response.data.data);
//                 } else {
//                     console.error("Unexpected data format:", response.data);
//                     setError("Data format error: Expected an array.");
//                 }
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching cluster data:", err);
//                 setError("Failed to load cluster data");
//                 setLoading(false);
//             }
//         };
//         fetchClusterData();
//     }, []);

//     // Data transformation for Plotly
//     const landsizeData = clusterData.map(item => item.Landsize);
//     const priceData = clusterData.map(item => item.Price);
//     const bedroomData = clusterData.map(item => item.Bedroom2);

//     // Log transformed data for debugging
//     console.log("Transformed Landsize Data:", landsizeData);
//     console.log("Transformed Price Data:", priceData);
//     console.log("Transformed Bedroom Data:", bedroomData);

//     return (
//         <div>
//             <h2>Data Visualizations</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//             {!loading && !error && clusterData.length > 0 ? (
//                 <div>
//                     {/* Scatter Plot: Landsize vs Price */}
//                     <Plot
//                         data={[
//                             {
//                                 x: landsizeData,
//                                 y: priceData,
//                                 mode: 'markers',
//                                 type: 'scatter',
//                                 marker: { color: 'blue' },
//                                 name: 'Landsize vs Price',
//                             },
//                         ]}
//                         layout={{
//                             title: 'Scatter Plot of Landsize vs Price',
//                             xaxis: { title: 'Landsize' },
//                             yaxis: { title: 'Price' },
//                             autosize: true,
//                         }}
//                     />

//                     {/* Bar Chart: Count of Properties by Bedroom2 */}
//                     <Plot
//                         data={[
//                             {
//                                 x: bedroomData,
//                                 type: 'histogram',
//                                 marker: { color: 'orange' },
//                                 name: 'Bedroom Count',
//                             },
//                         ]}
//                         layout={{
//                             title: 'Distribution of Properties by Bedroom Count',
//                             xaxis: { title: 'Bedrooms' },
//                             yaxis: { title: 'Count' },
//                             autosize: true,
//                         }}
//                     />
//                 </div>
//             ) : (
//                 !loading && !error && <p>No data available to display</p>
//             )}
//         </div>
//     );
// };

// export default DataVisualization;

import React, { useEffect } from 'react';

const DataVisualization = () => {
    useEffect(() => {
        console.log("DataVisualization Component Mounted");
    }, []);

    return (
        <div>
            <h2>Data Visualization Page</h2>
            <p>This is where your data visualizations will appear.</p>
        </div>
    );
};

export default DataVisualization;
