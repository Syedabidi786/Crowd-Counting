import React, { useState, useEffect } from 'react';
import { fetchAllLocations } from '../api';

function LocationSelector({ onSelectAll, onLocationSelect, onDownload }) {
  const [locations, setLocations] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const locationImage = "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png";

  // Fetch locations from backend
  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchAllLocations();
        // Add a `selected` field to each location for managing selection state
        const updatedLocations = data.map((location) => ({
          ...location,
          selected: false,
        }));
        setLocations(updatedLocations);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    getLocations();
  }, []);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedLocations = locations.map((location) => ({
      ...location,
      selected: newSelectAll,
    }));
    setLocations(updatedLocations);
    onSelectAll(newSelectAll);
  };

  const handleLocationSelect = (selectedLocation) => {
    const updatedLocations = locations.map((location) =>
      location._id === selectedLocation._id
        ? { ...location, selected: !location.selected }
        : location
    );
    setLocations(updatedLocations);
    onLocationSelect(selectedLocation);
  };

  return (
    <div className="location-selector-container">
      <h3 className="location-selector-title">Reports</h3>
      <div className="location-selector-actions">
        <span>Select All</span>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      </div>
      <ul className="location-list">
        {locations.map((location) => (
          <li key={location._id} className="location-item">
            <input
              type="checkbox"
              checked={location.selected}
              onChange={() => handleLocationSelect(location)}
            />
            <img
              src={location.img || locationImage}
              alt={location.name}
              className="location-img"
            />
            <span>{location.name}</span>
          </li>
        ))}
      </ul>
      <button className="download-button" onClick={onDownload}>
        Download
      </button>
    </div>
  );
}

export default LocationSelector;
