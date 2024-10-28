from fastapi import APIRouter, HTTPException
from app.controllers.location_controller import (
    create_location, get_location, get_all_locations,
    update_location, delete_location, get_total_people_count
)
from app.schemas.location_schema import LocationSchema

# Initialize the router
router = APIRouter()

@router.post("/locations/", response_model=dict)
async def add_location(location: LocationSchema):
    location_id = await create_location(location)
    return {"location_id": location_id}

@router.get("/locations/{location_id}")
async def fetch_location(location_id: str):
    location = await get_location(location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@router.get("/locations/")
async def fetch_all_locations():
    locations = await get_all_locations()
    return locations

@router.put("/locations/{location_id}")
async def modify_location(location_id: str, location: LocationSchema):
    updated_location = await update_location(location_id, location)
    return updated_location

@router.delete("/locations/{location_id}")
async def remove_location(location_id: str):
    deleted = await delete_location(location_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Location not found")
    return {"status": "Location deleted"}

@router.get("/analytics/total_people_count/")
async def fetch_total_people_count():
    total_count = await get_total_people_count()
    return {"total_people": total_count}
