from flask import Flask, request, jsonify,send_from_directory
import os
from flask_cors import CORS  
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__,static_folder="front end/build",static_url_path="/")
CORS(app) 

# Load the model and scaler
model = pickle.load(open("models/linear_model.pkl", "rb"))
scaler = pickle.load(open("models/scaler.pkl", "rb"))

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    
    input_data = pd.DataFrame([data])
    
    scaled_data = scaler.transform(input_data)
    
    prediction = model.predict(scaled_data)
    
    response = {
        "prediction": str(prediction[0]) }
    return jsonify(response)



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, path) if path else send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
