import os
import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import io

app = Flask(__name__)

# Load the pre-trained model once when the API starts
MODEL_PATH = "Potato_Disease_Classification_Model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Define class names (based on your dataset)
CLASS_NAMES = ['Early Blight', 'Late Blight', 'Healthy']  # Replace with your actual class names

# Function to preprocess the image
def preprocess_image(image):
    img = Image.open(image).resize((256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Prediction function
def predict(image):
    img_array = preprocess_image(image)
    prediction = model.predict(img_array)
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = round(np.max(prediction) * 100, 2)
    return predicted_class, confidence

# API endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict_endpoint():
    # Check if an image file is part of the request
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    
    image_file = request.files['image']
    
    # Check if the file is valid
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Make prediction
        predicted_class, confidence = predict(image_file)
        
        # Return the result as JSON
        return jsonify({
            'predicted_class': predicted_class,
            'confidence': f'{confidence}%'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check endpoint
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Potato Disease Classification API is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)