from pydantic import BaseModel

class LocationSchema(BaseModel):
    name: str
    people: int = 0  # Default people count to 0

    class Config:
        from_attributes = True
