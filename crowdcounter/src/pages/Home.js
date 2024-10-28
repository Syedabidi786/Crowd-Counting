import React from 'react';
import Heading from '../components/Heading';
import TotalCountCard from '../components/TotalCountCard';
import LocationWiseCount from '../components/LocationWiseCount';
import BarGraph from '../components/BarGraph';

function Home() {
  return (
    <div className="page-container">
      <Heading />
      <div className="dashboard-content">
        <div className="dashboard-top-row">
          <TotalCountCard />
        </div>
        <div className="dashboard-bottom-row">
          <LocationWiseCount />
          <div className="bar-graph-container">
            <BarGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
