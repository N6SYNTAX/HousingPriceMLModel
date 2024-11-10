import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

# Define global variables
scaler = None
kmeans = None
cluster_models = {}

def MLModel():
    global scaler, kmeans, cluster_models

    # Data setup
    file_path = 'Data/Melbourne_housing_FULL.csv'
    df = pd.read_csv(file_path)
    df = df.dropna(subset=['Price', 'Landsize', 'Bedroom2'])
    df = df[(df['Price'] >= 100000) & (df['Price'] <= 10000000)]

    # Standardize features
    scaler = StandardScaler()
    df[['Bedroom2', 'Landsize']] = scaler.fit_transform(df[['Bedroom2', 'Landsize']])

    # Fit K-means model
    kmeans = KMeans(n_clusters=3, random_state=0)
    df['cluster'] = kmeans.fit_predict(df[['Bedroom2', 'Landsize']])

    # Train regression models for each cluster
    cluster_models = {}
    for cluster in df['cluster'].unique():
        cluster_data = df[df['cluster'] == cluster]
        model = LinearRegression()
        model.fit(cluster_data[['Bedroom2', 'Landsize']], cluster_data['Price'])
        cluster_models[cluster] = model

def predict_price(bedrooms, landsize):
    global scaler, kmeans, cluster_models

    # Ensure scaler and model are initialized
    if scaler is None or kmeans is None or not cluster_models:
        raise Exception("Models are not initialized. Call MLModel() before predict_price().")

    # Preprocess input
    new_data = pd.DataFrame([[bedrooms, landsize]], columns=['Bedroom2', 'Landsize'])
    scaled_features = scaler.transform(new_data)
    scaled_features_df = pd.DataFrame(scaled_features, columns=['Bedroom2', 'Landsize'])

    # Predict cluster and price
    cluster = kmeans.predict(scaled_features_df)[0]
    model = cluster_models[cluster]
    predicted_price = model.predict(scaled_features_df)[0]
    return predicted_price

MLModel()

# Example prediction
print("Predicted price:", predict_price(1, 150))

bed = int(input("Enter Num Of Bedrooms: "))
land = int(input("Enter Num Of Bedrooms: "))

predict_price(bed,land)

