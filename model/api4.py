import os
import numpy as np
from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
from flask_cors import CORS
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Folder to save uploaded images
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Utility to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Load the pre-trained model once when the API starts
MODEL_PATH = os.path.join(os.path.dirname(__file__), "Potato_Disease_Classification_Model.keras")
model = tf.keras.models.load_model(MODEL_PATH)

# Define class names (based on your dataset)
CLASS_NAMES = ['Early Blight', 'Late Blight', 'Healthy']

# Function to preprocess the image
def preprocess_image(image_path):
    img = Image.open(image_path).resize((256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Prediction function
def predict(image_path):
    img_array = preprocess_image(image_path)
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
    return jsonify({
        'message': 'Potato Disease Classification API is running',
        'version': '1.0.0',
        'endpoints': {
            '/predict': 'POST - Upload image for disease prediction',
            '/health': 'GET - Health check'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'model_loaded': model is not None})


if __name__ == '__main__':
    print("🚀 Starting Flask ML API on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
    