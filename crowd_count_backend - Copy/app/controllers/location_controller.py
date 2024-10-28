from app.models.location import locations_collection
from app.schemas.location_schema import LocationSchema
from bson import ObjectId

async def create_location(location: LocationSchema):
    location_data = location.dict()
    result = await locations_collection.insert_one(location_data)
    return str(result.inserted_id)

async def get_location(location_id: str):
    location = await locations_collection.find_one({"_id": ObjectId(location_id)})
    if location:
        location["_id"] = str(location["_id"])  # Convert ObjectId to string
    return location

async def get_all_locations():
    locations = await locations_collection.find().to_list(100)  # Limit to 100 for now
    # Convert each ObjectId to string in all documents
    for location in locations:
        location["_id"] = str(location["_id"])
    return locations

async def update_location(location_id: str, location: LocationSchema):
    await locations_collection.update_one(
        {"_id": ObjectId(location_id)},
        {"$set": location.dict()}
    )
    # Fetch the updated location to return it
    updated_location = await get_location(location_id)
    return updated_location

async def delete_location(location_id: str):
    result = await locations_collection.delete_one({"_id": ObjectId(location_id)})
    return result.deleted_count > 0

async def get_total_people_count():
    count = 0
    async for location in locations_collection.find():
        count += location.get("people", 0)
    return count
