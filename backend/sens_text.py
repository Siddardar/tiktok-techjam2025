import cv2
import pytesseract
from transformers import pipeline
from meaningful_text import GibberishDetector

def is_sensitive_text(image_bytes) -> bool:
    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Image is None")

    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    extracted_text = pytesseract.image_to_string(rgb_image)
    print(extracted_text)

    gibberish_detector = GibberishDetector()
    if not gibberish_detector.is_meaningful(extracted_text):
        print("Extracted text is gibberish or too short.")
        return False

    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    labels = ["Sensitive", "Not Sensitive"]
    result = classifier(extracted_text, candidate_labels=labels)

    print("Extracted Text:")
    print(extracted_text)

    print("\nSensitive text analysis:")
    print("Confidence:", result['scores'][0])

    return result['labels'][0] == "Sensitive"
