import React, { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi'; // Importing an icon from react-icons
import { fetchTotalPeopleCount } from '../api'; // Importing the API function

function TotalCountCard() {
  // State to store the fetched count
  const [totalCount, setTotalCount] = useState(0); // Default to 0

  // Use useEffect to fetch the total count on component mount
  useEffect(() => {
    const getTotalCount = async () => {
      try {
        const count = await fetchTotalPeopleCount(); // Fetch the total count
        setTotalCount(count); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching total count:', error);
      }
    };

    getTotalCount(); // Call the async function
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div className="card">
      <div className="content">
        <div>
          <h5 className="title">Total People</h5>
          <h2 className="count">{totalCount}</h2> {/* Render the count from state */}
        </div>
        <div className="icon-container">
          <FiUsers className="icon" />
        </div>
      </div>
    </div>
  );
}

export default TotalCountCard;
