## Here is how the it will be run:
Front end:
After cloning the repository, change directory to "crowdcounter". Then the following commands:
1. npm i
2. npm start


Backend:
1. Enable virtual environment
   venv\Scripts\activate

2. Install requirements
pip install -r requirements.txt


3. Copy the link to your mongodb cluster and paste it in .env file

4. Run the backend using:
./run.bat (for windows)
./run.sh (for mac)

NOTE: change run.bat file to run.sh.



## Crowd Counting System
This project is a real-time crowd-counting solution developed to monitor and manage crowd density in public spaces. Using a combination of video processing and machine learning, the system provides actionable insights to improve safety, optimize resource allocation, and enhance public service operations.

## Overview
This system captures video feeds from CCTV cameras, processes the frames in real time to estimate crowd density, and updates a live dashboard for monitoring. It is designed to be scalable, privacy-preserving, and adaptable to various public space environments, such as parks, transit stations, and event venues.

## Key Features
1. Real-Time Crowd Monitoring
Instant Insights: The system processes video feeds in real-time and calculates crowd density instantly for each monitored location.
Live Updates: Each location’s crowd count is continuously updated on the frontend dashboard, allowing for immediate situational awareness.
2. Location-Based Data Aggregation
Multi-Location Support: The system can track crowd density across multiple locations simultaneously, making it ideal for city planners and large venues with diverse zones.
Dashboard Visuals: A responsive, user-friendly dashboard presents each location's crowd data, helping users understand crowd distribution at a glance.
3. Privacy-Preserving Design
Anonymous Data Collection: No personally identifiable information is collected or stored. The system only logs aggregate crowd numbers, respecting individual privacy.
Regulatory Compliance: Designed to align with privacy regulations, such as GDPR, by processing only the necessary data for crowd counting.
4. Notifications and Alerts (Planned Feature)
Safety Alerts: The system can be configured (in future versions) to send real-time alerts when crowd density surpasses predefined thresholds, supporting crowd control and public safety.
Customizable Thresholds: Users will be able to set occupancy limits based on location-specific needs, with instant alerts for quick response.
5. Scalability and High Performance
Optimized Processing: By using interval-based frame processing, the system balances accuracy with performance, allowing for real-time processing without overwhelming resources.
Asynchronous Architecture: Built with FastAPI and MongoDB, the backend supports high-frequency data requests and can handle simultaneous connections effectively.
6. Historical Data Analysis (Future Enhancement)
Long-Term Insights: Although the current version only provides real-time data, future updates will enable storage of historical crowd data for trend analysis and predictive insights.
Trend Identification: Useful for city planners to identify peak times and optimize staffing or resource allocation based on historical crowd patterns.
Technology Stack
Frontend: React for dynamic, responsive user interface and data visualization.
Backend: FastAPI with asynchronous processing capabilities.
Database: MongoDB for fast, scalable data storage and retrieval.
Machine Learning Model: Custom-trained model for accurate crowd density estimation.