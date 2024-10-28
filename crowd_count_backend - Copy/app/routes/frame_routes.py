from fastapi import APIRouter, HTTPException, UploadFile, File
from app.controllers.frame_controller import process_frame

router = APIRouter()

@router.post("/frames/{location_id}")
async def upload_frame(location_id: str, file: UploadFile = File(...)):
    try:
        # Pass the frame to the processing function
        frame = await file.read()  # Read the file data
        result = await process_frame(location_id, frame)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
