from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
from Model import MLModel, predict_price  # Import your functions from Model.py

app = FastAPI()

# Add CORS middleware to allow requests from the frontend (React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL of React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the ML model on startup
MLModel()

# Define the data structure for POST request input
class PricePredictionInput(BaseModel):
    bedrooms: int = Field(..., ge=1, le=10, description="Number of bedrooms")  # Validate between 1 and 10 bedrooms
    landsize: float = Field(..., gt=0, description="Land size in square meters")  # Must be positive

# Health check route
@app.get("/")
async def root():
    return {"message": "Hi, This is the API for our housing price predictor"}

# GET endpoint for a simple prediction route
@app.get("/predict/{bedrooms}/{landsize}")
async def predict_price_get(bedrooms: int, landsize: float):
    try:
        # Make prediction using the imported predict_price function
        predicted_price = predict_price(bedrooms, landsize)
        return {"predicted_price": round(predicted_price, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# POST endpoint for predicting house prices
@app.post("/predict")
async def predict_price_post(input: PricePredictionInput):
    try:
        # Call the prediction function with user input data
        predicted_price = predict_price(input.bedrooms, input.landsize)
        return {"predicted_price": round(predicted_price, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)