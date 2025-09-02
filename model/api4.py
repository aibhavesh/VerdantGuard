import os
import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import io
from flask_cors import CORS
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Folder to save uploaded images
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Utility to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def example_function(x, y):
    """
    Adds two numbers and returns the result.

    Args:
        x (int): First number
        y (int): Second number

    Returns:
        int: Sum of x and y
    """
    return x + y


# Load the pre-trained model once when the API starts
MODEL_PATH = "M:\\VerdantGuard\\model\\Potato_Disease_Classification_Model.keras"
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
    if 'image' not in request.files or 'leafType' not in request.form:
        return jsonify({'message': 'Missing image or leaf type'}), 400

    image = request.files['image']
    leaf_type = request.form['leafType']

    if image.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if not allowed_file(image.filename):
        return jsonify({'message': 'Unsupported file type'}), 400

    filename = secure_filename(image.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    image.save(filepath)

    
    try:
        # Make prediction
        predicted_class, confidence = predict(filepath)
        
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
    app.run(debug=True, port=5000)
    