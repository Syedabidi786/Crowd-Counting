# from fastapi import FastAPI
# from app.routes.location_routes import router as location_router
# from app.routes.frame_routes import router as frame_router

# app = FastAPI()

# # Include the routers
# app.include_router(location_router, prefix="/api")
# app.include_router(frame_router, prefix="/api")

# @app.get("/")
# async def root():
#     return {"message": "Welcome to the Crowd Count API"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.location_routes import router as location_router
from app.routes.frame_routes import router as frame_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with the origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the routers
app.include_router(location_router, prefix="/api")
app.include_router(frame_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Crowd Count API"}
