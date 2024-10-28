import random  # For demonstration; replace with actual model loading
from ultralytics import YOLO
from PIL import Image
import numpy as np
import io
import cv2

class CrowdCountModel:
    def __init__(self):
        # Initialize or load your actual model here
        self.model = YOLO("yolov8n.pt")
        print("Model loaded")

    def predict(self, frame):
        # Convert the input frame to JPEG format if it’s not already in JPEG format
        if not isinstance(frame, bytes):  # Assuming 'frame' is in bytes, e.g., from an HTTP request
            raise ValueError("Input frame must be in bytes format")

        # Convert to an Image object
        image = Image.open(io.BytesIO(frame))

        # Convert the PIL image to a numpy array in RGB format
        image_np = np.array(image.convert("RGB"))

        # Convert RGB to BGR for OpenCV compatibility if needed
        image_bgr = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

        # Use YOLO model to make predictions
        results = self.model(image_bgr)
        people_count = 0
        PERSON_CLASS_ID = 0

        # Count people in the image
        for box in results[0].boxes:
            if box.cls == PERSON_CLASS_ID:  # Assuming class ID 0 represents 'person'
                people_count += 1
        
        return people_count

# Initialize model instance globally
crowd_count_model = CrowdCountModel()
