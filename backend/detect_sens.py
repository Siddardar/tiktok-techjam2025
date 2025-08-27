from face_recog import detect_face
from sens_text import is_sensitive_text

def is_document_sensitive(image):
    face_found = detect_face(image)
    
    print(f"Face detected? {face_found}")

    sensitive_text = is_sensitive_text(image)
    print(f"Is text sensitive? {sensitive_text}")

    return face_found or sensitive_text