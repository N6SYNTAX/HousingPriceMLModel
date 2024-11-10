# HousingPriceMLModel

Project Overview


Before running this project, you need to install the following libraries:

    Python 3.x (Preferably 3.7 or higher)
    pandas
    NumPy
    scikit-learn
    Matplotlib
    Jupyter Notebook (Optional, but recommended for interactive use)

Installation Guide

    Install Python: Ensure you have Python installed on your system. 

Running the Project

    Open the Project in Jupyter Notebook: Navigate to the project folder and launch the Jupyter Notebook interface
    MLModel_1_K-Means_Clustering.ipynb and MLModel_2_RFC.ipynb files to view and execute the models.


Model Training Instructions
1. Training the K-Means Clustering Model

    Place your desired dataset path into pandas and run


2. Training the Random Forest Model:

    Place your desired dataset path into pandas and run



.
├── Data/                       
│   └── Melbourne_housing_FULL.csv  
├── ML/                  
│   ├── MLModel_1_K-Means_Clustering.ipynb  
│   └── MLModel_2_RFC.ipynb                  
├── Data Analysis/                        
│   └── DataAnalysis.ipynb         
├── README.md               


# Housing Price Prediction Web Application
Project Overview

This project is a web application that predicts housing prices based on key property features such as the number of bedrooms and land size. It integrates machine learning for accurate predictions, a FastAPI back-end for handling requests, and a React front-end for user interaction and data visualization. The model uses clustering and regression to provide more tailored predictions, making it useful for real estate analysis and decision-making.
Before running this project, ensure you have the following libraries installed:
Back-End Requirements:

    Python 3.x (Preferably 3.7 or higher)
    FastAPI
    Uvicorn
    Pandas
    NumPy
    Scikit-learn
    Matplotlib (optional for local testing and visualization)

Front-End Requirements:

    Node.js and npm (for managing React dependencies)

Installation Guide
Install Python and Dependencies for the Back-End

    Install Python: Ensure Python 3.x is installed on your system.
    Set Up Virtual Environment (Recommended):

python -m venv .venv
source .venv/bin/activate  # For Windows, use .venv\Scripts\activate

Install Required Libraries:

    pip install fastapi uvicorn pandas numpy scikit-learn

Set Up the React Front-End

    Navigate to the Front-End Directory:

cd frontend

Install Node.js Packages:

    npm install

Running the Project
1. Running the FastAPI Back-End

    Navigate to the Project Folder:

cd backend  

Start the FastAPI Server:

    uvicorn main:app --reload

    Server Location: Access the server at http://127.0.0.1:8000.

2. Running the React Front-End

    Start the React Development Server:

    npm start

    Access the Front-End: Go to http://localhost:3000 to use the application.

Model Training Instructions

    Training the K-Means Clustering Model:
        Ensure your dataset, Melbourne_housing_FULL.csv, is placed in the Data/ directory.
        The model training is initiated automatically when you start the FastAPI server. The MLModel() function in Model.py loads and preprocesses the data, performs K-means clustering, and trains cluster-specific linear regression models.

    Model Predict Function:
        The predict_price function in Model.py processes user input, assigns a cluster, and uses the relevant regression model to return a predicted price.

Directory Structure

HousingPriceMLModel
.
├── .venv/     
├── backend/         
|   ├── main.py                           # FastAPI server handling requests and predictions
│   ├── Model.py                          # Refined ML Model for webserver
│   └── Melbourne_housing_FULL.csv        # Dataset for model training and prediction
├── Machine Learning/
|   ├── # Files from last assignment
├── frontend/                        
│   ├── App.js                            # React main application file
│   ├── UserInputForm.js                  # User input form for entering property features
│   └── DataVisualization.js              # Data visualization component for interactive charts
├── README.md                             # Project documentation