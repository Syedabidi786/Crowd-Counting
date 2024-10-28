import React, { useState, useEffect } from 'react';
import { fetchAllLocations } from '../api';

function LocationWiseCount() {
  const locationImage = "https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_640.png";
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  // Fetch locations from the backend
  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchAllLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
        setError("Could not load location data");
      }
    };

    getLocations();
  }, []);

  return (
    <div className="location-count-card">
      <h3 className="location-count-title">Locations</h3>
      {error && <div className="error-message">{error}</div>}
      <table className="location-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location._id}>
              <td className="location-info">
                <img src={locationImage} alt={location.name} className="profile-img" />
                <span>{location.name}</span>
              </td>
              <td>{location.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocationWiseCount;
