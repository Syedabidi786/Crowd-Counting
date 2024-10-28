import React, { useState, useRef, useEffect } from 'react';
import Heading from '../components/Heading';
import LocationSelector from '../components/LocationSelector';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Bar } from 'react-chartjs-2';
import { fetchAllLocations } from '../api'; // Import the API function
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reports() {
  const [locations, setLocations] = useState([]);
  const barChartRef = useRef(null);
  const [chartImage, setChartImage] = useState(null);

  // Fetch locations from the backend when the component mounts
  useEffect(() => {
    const getLocations = async () => {
      try {
        const data = await fetchAllLocations();
        // Initialize selected state for each location
        const updatedLocations = data.map(location => ({
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

  // Update the chart image whenever locations change
  useEffect(() => {
    if (barChartRef.current) {
      const chartInstance = barChartRef.current;
      setChartImage(chartInstance.toBase64Image());
    }
  }, [locations]);

  const handleSelectAll = (selectAll) => {
    const updatedLocations = locations.map((location) => ({
      ...location,
      selected: selectAll,
    }));
    setLocations(updatedLocations);
  };

  const handleLocationSelect = (selectedLocation) => {
    const updatedLocations = locations.map((location) =>
      location._id === selectedLocation._id
        ? { ...location, selected: !location.selected }
        : location
    );
    setLocations(updatedLocations);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const selectedLocations = locations.filter((loc) => loc.selected);

    if (selectedLocations.length === 0) {
      alert('Please select at least one location');
      return;
    }

    // Title of the report
    doc.text('Locations Report', 20, 10);
    
    // Data for the table
    const tableData = selectedLocations.map((loc) => [loc.name, loc.people]);
    doc.autoTable({
      head: [['Location', 'People']],
      body: tableData,
      startY: 20,
    });

    try {
      if (!chartImage) {
        throw new Error('Chart image is not available');
      }

      // Add the chart image to the PDF
      doc.addImage(chartImage, 'PNG', 15, doc.autoTable.previous.finalY + 10, 180, 80);
      doc.save('locations-report.pdf');
    } catch (error) {
      console.error('Error generating PDF with charts:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const barChartData = {
    labels: locations.map((loc) => loc.name),
    datasets: [
      {
        label: 'Number of People',
        data: locations.map((loc) => loc.people),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="reports-container">
      <div className="main-content">
        <Heading />
        <LocationSelector
          locations={locations}
          onSelectAll={handleSelectAll}
          onLocationSelect={handleLocationSelect}
          onDownload={generatePDF}
        />

        {/* Hidden Bar Chart to generate chart image for PDF */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '500px', height: '300px' }}>
          <Bar data={barChartData} ref={barChartRef} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
