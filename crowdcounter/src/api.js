import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch total people count
export const fetchTotalPeopleCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/total_people_count/`);
    console.log(response.data.total_people);
    return response.data.total_people;
  } catch (error) {
    console.error("Error fetching total people count:", error);
    throw error;
  }
};

// Fetch all locations
export const fetchAllLocations = async () => {
  try {
    const response = await axios.get(`${API_URL}/locations/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Add a new location
export const addLocation = async (locationData) => {
  try {
    const response = await axios.post(`${API_URL}/locations/`, locationData);
    return response.data;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
};

// Delete a location by ID
export const deleteLocation = async (locationId) => {
  try {
    const response = await axios.delete(`${API_URL}/locations/${locationId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
};

// Update a location by ID
export const updateLocation = async (locationId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/locations/${locationId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

// Upload frame data for a specific location (for frame processing)
export const uploadFrame = async (locationId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/frames/${locationId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading frame:", error);
    throw error;
  }
};
