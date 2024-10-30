import React, { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { fetchAllLocations } from '../api';

function BarGraph() {
  const [data, setData] = useState([]);
  const [maxPeopleCount, setMaxPeopleCount] = useState(0);

  // Fetch location data from the backend
  useEffect(() => {
    const getLocationsData = async () => {
      try {
        const locations = await fetchAllLocations();

        // Format data for BarChart
        const chartData = locations.map(location => ({
          name: location.name,
          People: location.people,
        }));
        setData(chartData);

        // Find the maximum people count and add 10 to set as y-axis upper bound
        const maxCount = Math.max(...locations.map(location => location.people));
        setMaxPeopleCount(maxCount + 10);

      } catch (error) {
        console.error("Failed to fetch location data:", error);
      }
    };

    getLocationsData();
  }, []);

  return (
    <div style={{ width: '450px', height: 350, padding: '10px 10px 70px 10px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: "'Roboto Condensed', sans-serif" }}>
        Locations Analytics
      </h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          {/* X-axis with label "Locations" */}
          <XAxis dataKey="name" label={{ value: 'Locations', position: 'insideBottomRight', offset: -5 }} />

          {/* Y-axis with dynamic upper bound based on max people count */}
          <YAxis 
            label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 0 }} 
            domain={[0, maxPeopleCount]}
          />

          {/* Tooltip */}
          <Tooltip />

          {/* Bar with reduced hover effect */}
          <Bar 
            dataKey="People" 
            fill="#6a0dad" 
            barSize={20} 
            animationBegin={0} 
            animationDuration={1500} 
            activeBarSize={35} // Limit the size increase on hover
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarGraph;
