from flask import Flask, request, jsonify
import numpy as np

from face_recog import detect_face
from sens_text import is_sensitive_text

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'bmp', 'tiff', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-image', methods=['POST'])
def upload_image():
    try:
        if not request.files:
            return jsonify({
                'success': False,
                'error': 'No image file provided'
            }), 400
        
        file = next(iter(request.files.values()))
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        if file:
            file_bytes = np.frombuffer(file.read(), np.uint8)
            print(f"Received file: {file.filename}, Size: {len(file_bytes)} bytes")

            face_pixels = detect_face(file_bytes)

            return jsonify({
                'sensitive': bool(face_pixels or is_sensitive_text(file_bytes)),
                'pixels': face_pixels
            }), 200
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Upload failed: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)