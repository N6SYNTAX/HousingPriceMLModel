import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

def MLModel():
    # Data setup
    file_path = 'Data/Melbourne_housing_FULL.csv'
    df = pd.read_csv(file_path)

    # Remove rows where critical columns have missing values
    df = df.dropna(subset=['Price', 'Landsize', 'BuildingArea', 'Bedroom2', 'Bathroom', 'Car'])

    # Drop unnecessary columns to simplify the dataset
    df = df.drop(columns=['BuildingArea','Bathroom', 'Car','Rooms','Postcode', 'YearBuilt','Type','Propertycount', 'Longtitude', 'Lattitude',  'CouncilArea', 'Regionname', 'Suburb', 'Address', 'Method', 'SellerG', 'Date'])
    row_count = len(df)

    # Drop rows where Price is less than 100k or more than 10M
    df = df[(df['Price'] >= 100000) & (df['Price'] <= 10000000)]

    row_count2 = len(df)
    print(f'The DataFrame has {row_count2} rows.')
    df

    # Check for duplicates
    duplicates = df.duplicated()
    print(f"Number of duplicate rows is {duplicates.sum()}")

    # Remove duplicate rows
    df = df.drop_duplicates()

    # Standardize the features
    scaler = StandardScaler()
    df[['Bedroom2', 'Landsize']] = scaler.fit_transform(df[['Bedroom2', 'Landsize']])

    # Fit K-means clustering
    kmeans = KMeans(n_clusters=3, random_state=0)
    df['cluster'] = kmeans.fit_predict(df[['Bedroom2', 'Landsize']])

    # Train separate regression models for each cluster
    cluster_models = {}
    for cluster in df['cluster'].unique():
        cluster_data = df[df['cluster'] == cluster]
        model = LinearRegression()
        model.fit(cluster_data[['Bedroom2', 'Landsize']], cluster_data['Price'])
        cluster_models[cluster] = model

def predict_price(bedrooms, landsize):
    # Create a DataFrame for input to retain column names and ensure compatibility
    new_data = pd.DataFrame([[bedrooms, landsize]], columns=['Bedroom2', 'Landsize'])
    # Scale the input features
    scaled_features = scaler.transform(new_data)
    scaled_features_df = pd.DataFrame(scaled_features, columns=['Bedroom2', 'Landsize'])
    
    # Predict the cluster using the scaled features with column names
    cluster = kmeans.predict(scaled_features_df)[0]
    
    # Use the regression model specific to the predicted cluster
    model = cluster_models[cluster]
    predicted_price = model.predict(scaled_features_df)[0]  # Pass scaled DataFrame to match feature names
    return predicted_price

# Example prediction
print("Predicted price:", predict_price(1, 150))

bed = int(input("Enter Num Of Bedrooms: "))
land = int(input("Enter Num Of Bedrooms: "))

predict_price(bed,land)

