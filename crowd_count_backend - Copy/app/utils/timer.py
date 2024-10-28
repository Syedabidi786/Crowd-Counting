import time

class FrameProcessingTimer:
    def __init__(self, interval=10):
        self.interval = interval
        self.last_processed_time = time.time()

    def can_process_frame(self):
        current_time = time.time()
        if current_time - self.last_processed_time >= self.interval:
            self.last_processed_time = current_time
            return True
        return False

# Initialize a global timer instance
frame_timer = FrameProcessingTimer()
