import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, Switch, FormControlLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserInputForm from './UserInputForm';
import DataVisualization from './DataVisualization';

function App() {
  const [activeTab, setActiveTab] = useState(0); // Start with the "User Input" tab
  const [predictionData, setPredictionData] = useState([]); // Hold prediction data for visualization
  const [darkMode, setDarkMode] = useState(false); // Toggle for dark/light mode

  // Theme setup for light and dark modes with a gray background in dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#424242' : '#f5f5f5',
      },
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Capture prediction data and update state
  const handlePrediction = (data) => {
    setPredictionData(data.predictions);
  };

  // Toggle theme between light and dark
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <Container maxWidth="md">
          {/* App Bar with Tabs */}
          <AppBar position="static">
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="User Input" />
              <Tab label="Data Visualization" />
            </Tabs>
          </AppBar>

          {/* Dark Mode Toggle */}
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={handleThemeToggle} />}
              label={darkMode ? "Dark Mode" : "Light Mode"}
            />
          </Box>

          {/* Tab Content */}
          <Box sx={{ padding: 3 }}>
            {/* User Input Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h4" align="center" gutterBottom>
                  AI Prediction Application
                </Typography>
                <UserInputForm onPrediction={handlePrediction} />
              </Box>
            )}

            {/* Data Visualization Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h4" align="center" gutterBottom>
                  Visualization
                </Typography>
                {predictionData.length > 0 ? (
                  <DataVisualization predictionData={predictionData} />
                ) : (
                  <Typography color="textSecondary" align="center">
                    No data available. Please enter inputs in the User Input tab.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
