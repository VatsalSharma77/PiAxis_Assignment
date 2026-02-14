# PiAxis_Assignment
Detail Management System - Frontend
A modern, responsive React application for managing and searching architectural construction details with suggestions.

🚀 Tech Stack
React 18 with Vite - Fast development and optimized builds

Material-UI (MUI) - Modern component library with custom theming

Axios - HTTP client for API communication

JavaScript (ES6+) - Modern JavaScript features

📦 Installation
Prerequisites
Node.js (v16 or higher)

npm or yarn

Setup Steps
Clone the repository

bash
git clone <repository-url>
cd frontend
Install dependencies

bash
npm install
Configure environment variables

Create a .env file in the root directory:

text
VITE_BACKEND_URL=http://localhost:5000/api
Start development server

bash
npm run dev
The application will run on http://localhost:5173 (default Vite port)

📁 Project Structure
text
src/
├── api/
│   └── api.js                 # API functions (getDetails, searchDetails, suggestDetails)
├── services/
│   └── axiosInstance.js       # Configured Axios instance with base URL
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
Key Files
services/axiosInstance.js
Centralized Axios configuration

Automatically injects VITE_BACKEND_URL from environment variables

Provides consistent base URL for all API calls

api/api.js
Contains three core API functions:

getDetails() - Fetches all architectural details from the database

searchDetails(q) - Searches details by title, tags, or description

suggestDetails(host_element, adjacent_element, exposure) - Gets AI-powered detail recommendations

App.jsx
Main application component with three key sections:

Search Section - Real-time search with results display

Suggestion Form - Dropdown selectors for detail parameters

Results Display - Dynamic rendering of search results and AI suggestions

🎨 Features
1. View All Details
Displays all architectural details on initial load

Shows title, description, category, and tags

Smooth animations and hover effects

2. Search Functionality
Real-time search across title, tags, and description

Clear button to reset search

Loading states and error handling

Empty state feedback when no results found

3. AI-Powered Suggestions
Three dropdown selectors:

Host Element (External Wall, Internal Wall, Window)

Adjacent Element (Slab, Floor, External Wall)

Exposure (External, Internal)

Clear buttons for each dropdown

Validation for required fields

🔄 How It Works
Application Flow
Initial Load

useEffect hook calls getDetails() API

Fetches all details from backend

Displays results in search section

Search Flow

text
User Input → handleSearch() → searchDetails(q) API → Update State → Re-render Results
Suggestion Flow

text
Select Dropdowns → handleSuggest() → suggestDetails() API → Display Matched Detail + Explanation
