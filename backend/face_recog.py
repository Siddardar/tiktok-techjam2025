import cv2
import mediapipe as mp

mp_face = mp.solutions.face_detection

def detect_face(image_bytes):
    image = cv2.imdecode(image_bytes, cv2.IMREAD_COLOR)
    if image is None:
        raise ValueError("Image is None")
    
    if len(image.shape) == 3 and image.shape[2] == 3:
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    else:
        rgb_image = image
    
    image_height, image_width = rgb_image.shape[:2]

    with mp_face.FaceDetection(model_selection=1, min_detection_confidence=0.5) as face_detection:
        results = face_detection.process(rgb_image)

        faces = []
        if results.detections:
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                xmin = int(bbox.xmin * image_width)
                ymin = int(bbox.ymin * image_height)
                xmax = int((bbox.xmin + bbox.width) * image_width)
                ymax = int((bbox.ymin + bbox.height) * image_height)
                faces.append((xmin, xmax, ymin, ymax))

    return faces
