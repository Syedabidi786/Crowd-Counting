from app.utils.timer import frame_timer
from app.models.location import locations_collection
from model.crowd_count_model import crowd_count_model
from bson import ObjectId

async def process_frame(location_id: str, frame):
    print(f"Processing frame for location: {location_id}")  # Debug line
    if frame_timer.can_process_frame():
        people_count = crowd_count_model.predict(frame)
        
        # Update people count in MongoDB for the specified location
        await locations_collection.update_one(
            {"_id": ObjectId(location_id)},
            {"$set": {"people": people_count}}
        )
        return {"message": "Frame processed", "people_count": people_count}
    else:
        return {"message": "Frame ignored due to time interval"}
