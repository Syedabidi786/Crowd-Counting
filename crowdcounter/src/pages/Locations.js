import React, { useState, useEffect, useRef } from 'react';
import Heading from '../components/Heading';
import { FiSearch, FiFilter } from 'react-icons/fi';
import {
  fetchAllLocations,
  addLocation,
  deleteLocation,
  updateLocation,
  uploadFrame  // Make sure to include uploadFrame if you're using it
} from '../api';
import axios from 'axios';

function Locations() {
  const locationImage = "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png";
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [filterCondition, setFilterCondition] = useState('greater_than');
  const [newLocationName, setNewLocationName] = useState('');
  const [addLocationError, setAddLocationError] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureIntervalRef = useRef(null);

  // Fetch all locations
  const getLocations = async () => {
    try {
      const data = await fetchAllLocations();
      setLocations(data);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  };

  // Call getLocations on component mount
  useEffect(() => {
    getLocations();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const toggleFilter = () => setShowFilter(!showFilter);
  const handleFilterChange = (e) => setFilterValue(e.target.value);
  const handleFilterConditionChange = (e) => setFilterCondition(e.target.value);

  const handleAddLocation = async () => {
    setAddLocationError('');
    const trimmedName = newLocationName.trim();
    if (!trimmedName) {
      setAddLocationError('Location name is required');
      return;
    }
    if (locations.some(location => location.name.toLowerCase() === trimmedName.toLowerCase())) {
      setAddLocationError('A location with this name already exists');
      return;
    }
    const newLocation = { name: trimmedName, people: 0, img: locationImage };
    try {
      await addLocation(newLocation);
      setNewLocationName('');
      setAddLocationError('');
      await getLocations(); // Refetch all locations after adding a new one
    } catch (error) {
      setAddLocationError('Failed to add location');
    }
  };

  const handleDeleteLocation = async (locationId) => {
    try {
      await deleteLocation(locationId);
      await getLocations(); // Refetch all locations after deletion
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  const handleUpdateLocationName = async (index) => {
    const newName = prompt("Enter new name:", locations[index].name);
    if (newName) {
      const updatedLocation = { ...locations[index], name: newName };
      try {
        await updateLocation(locations[index]._id, updatedLocation);
        await getLocations(); // Refetch all locations after update
      } catch (error) {
        console.error("Failed to update location:", error);
      }
    }
  };

  const applySearch = (location) => location.name.toLowerCase().includes(searchTerm.toLowerCase());
  const applyFilter = (location) => {
    const people = location.people;
    const value = Number(filterValue);
    if (filterCondition === 'less_than') return people < value;
    if (filterCondition === 'equal_to') return people === value;
    if (filterCondition === 'greater_than') return people > value;
    return true;
  };
  const filteredLocations = locations.filter(applySearch);

  // Open the camera for a specific location
  const handleOpenCamera = (locationId) => {
    console.log("Opening camera for location:", locationId);
    setActiveLocationId(locationId);
    setCameraOpen(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          startCapture();
        })
        .catch((err) => console.error("Error accessing the camera:", err));
    }
  };

  // Close the camera and stop capture
  const handleCloseCamera = () => {
    setCameraOpen(false);
    clearInterval(captureIntervalRef.current);
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setActiveLocationId(''); // Clear the active location ID
  };

  // Start capturing frames every 5 seconds
  const startCapture = () => {
    captureIntervalRef.current = setInterval(() => {
      captureImage();
    }, 5000); // Capture every 5 seconds
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    sendImageToBackend(imageDataUrl, activeLocationId);
  };

  const sendImageToBackend = async (imageDataUrl, locationId) => {
    if (!locationId) {
      console.error("No location ID provided for sending image.");
      return;
    }
    try {
      const blob = await fetch(imageDataUrl).then(res => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "webcam.jpg");
      formData.append("locationId", locationId); // Explicitly send location ID
      await axios.post(`http://localhost:8000/api/frames/${locationId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image successfully sent to backend with locationId:", locationId);
    } catch (error) {
      console.error("Error sending image to backend:", error);
    }
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => handleCloseCamera();
  }, []);

  return (
    <div className="locations-container">
      <div className="main-content">
        <Heading />

        <div className="locations-content">
          <div className="locations-header">
            <h3 className="locations-title">Locations</h3>
            <div className="locations-actions">
              <span className="locations-action">
                <label htmlFor="search">Search</label>
                <FiSearch />
                <input
                  id="search"
                  type="text"
                  placeholder="Search location..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="search-input"
                />
              </span>

              <span className="locations-action" onClick={toggleFilter}>
                Filter <FiFilter />
              </span>
              {showFilter && (
                <div className="filter-section">
                  <input
                    type="number"
                    placeholder="Number of people"
                    value={filterValue}
                    onChange={handleFilterChange}
                    className="filter-input"
                  />
                  <select
                    value={filterCondition}
                    onChange={handleFilterConditionChange}
                    className="filter-select"
                  >
                    <option value="less_than">Less than</option>
                    <option value="equal_to">Equal to</option>
                    <option value="greater_than">Greater than</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="add-location">
            <input
              type="text"
              placeholder="New location name"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
            />
            <button onClick={handleAddLocation}>Add Location</button>
            {addLocationError && <div className="error-message">{addLocationError}</div>}
          </div>

          <ul className="location-list">
            {filteredLocations.map((location, index) => (
              <li key={location._id} className="location-item">
                <img src={location.img || locationImage} alt={location.name} className="profile-img" />
                <span className="location-name">{location.name}</span>
                <span className="location-people">{location.people}</span>
                <div className="location-item-actions">
                  <button onClick={() => handleUpdateLocationName(index)} style={{ padding: '5px', marginRight: '5px' }}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteLocation(location._id)} style={{ padding: '5px', marginRight: '5px' }}>
                    Delete
                  </button>
                  <button onClick={() => handleOpenCamera(location._id)} style={{ padding: '5px' }}>
                    Camera
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Webcam Preview */}
      {cameraOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000 }}>
          <video ref={videoRef} autoPlay style={{ width: '100%', maxHeight: '500px' }}></video>
          <button onClick={handleCloseCamera} style={{ padding: '10px 20px', backgroundColor: '#FF5733', color: 'white', position: 'absolute', top: 10, right: 20, zIndex: 1001 }}>
            Close Camera
          </button>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
      )}
    </div>
  );
}

export default Locations;
