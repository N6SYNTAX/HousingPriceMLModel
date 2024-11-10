# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from Model import MLModel, predict_price  # Import model initialization and prediction functions
import pandas as pd


# Initialize FastAPI app
app = FastAPI()

# Configure CORS to allow requests from React frontend on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with actual frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the ML model once at server startup to optimize performance
MLModel()

# Define the input model for the prediction API
class PricePredictionInput(BaseModel):
    bedrooms: int = Field(..., ge=1, le=10, description="Number of bedrooms")  # Input validation for bedrooms
    landsize: float = Field(..., gt=0, description="Land size in square meters")  # Input validation for landsize

# Root endpoint for health check
@app.get("/")
async def root():
    return {"message": "Hi, This is the API for our housing price predictor"}

# GET endpoint for making predictions with query parameters
@app.get("/predict/{bedrooms}/{landsize}")
async def predict_price_get(bedrooms: int, landsize: float):
    try:
        # Call prediction function with provided parameters
        predicted_price = predict_price(bedrooms, landsize)
        return {"predicted_price": round(predicted_price, 2)}  # Return rounded predicted price
    except Exception as e:
        # Return HTTP 500 error with error message if prediction fails
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# POST endpoint for making predictions with JSON payload
@app.post("/predict")
async def predict_price_post(input: PricePredictionInput):
    try:
        # Call prediction function with validated input data
        predicted_price = predict_price(input.bedrooms, input.landsize)
        return {"predicted_price": round(predicted_price, 2)}  # Return rounded predicted price
    except Exception as e:
        # Return HTTP 500 error if prediction fails
        raise HTTPException(status_code=500, detail="Internal server error: {str(e)}")






@app.get("/visualize/clusters")
async def visualize_clusters():
    try:
        df = pd.read_csv('Data/Melbourne_housing_FULL.csv').dropna(subset=['Bedroom2', 'Landsize', 'Price'])
        cluster_data = df[['Bedroom2', 'Landsize', 'Price']].to_dict(orient="records")
        return {"data": cluster_data}
    except Exception as e:
        print("Error in /visualize/clusters:", e)
        raise HTTPException(status_code=500, detail="Error generating cluster data.")

@app.get("/visualize/test")
async def visualize_test():
    try:
        # Attempt to load the CSV file
        print("Attempting to load CSV file...")
        df = pd.read_csv('Data/Melbourne_housing_FULL.csv')
        print("CSV file loaded successfully")
        
        # Fill NaN values with a placeholder, e.g., 0 or replace them as needed
        df = df.fillna(0)  # Replace NaN with 0; alternatively, you could use df.dropna()
        
        # Preview data
        sample_data = df.head(5).to_dict(orient="records")
        print("Sample data extracted:", sample_data)
        
        return {"data": sample_data}
    except FileNotFoundError as fnf_error:
        print("File not found:", fnf_error)
        raise HTTPException(status_code=500, detail="CSV file not found. Check the file path.")
    except Exception as e:
        print("Unexpected error in /visualize/test:", e)
        raise HTTPException(status_code=500, detail="Error loading test data.")
    



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
