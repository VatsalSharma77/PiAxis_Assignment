# PiAxis_Assignment

# Detail Management System - Frontend

A modern React application for managing and searching architectural construction details with suggestions.

---

## 🚀 Tech Stack

* **React 18** with **Vite** – Fast development and optimized builds
* **Material-UI (MUI)** – Modern UI component library
* **Axios** – HTTP client for API communication
* **JavaScript (ES6+)**

---

## 📦 Installation & Setup

### 🔹 Prerequisites

* Node.js (v16 or higher)
* npm or yarn

---

### 🔹 Steps to Run the Project

1️⃣ **Clone the repository**

```bash
git clone (https://github.com/VatsalSharma77/PiAxis_Assignment.git)
cd frontend
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Create environment file**

Create a `.env` file in the root folder and add:

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

4️⃣ **Start the development server**

```bash
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── api.js                 # API functions
├── services/
│   └── axiosInstance.js       # Axios configuration
├── App.jsx                    # Main component
└── main.jsx                   # Entry point
```

---

## 🔧 Core Functionality

### 1️⃣ View All Details

* Automatically fetches all details on page load
* Displays title, description, category, and tags
* Loading & error handling included

---

### 2️⃣ Search Details

* Search by:

  * Title
  * Tags
  * Description
* Real-time search
* Clear button to reset results
* Empty state handling

---

### 3️⃣ Detail Suggestion

User selects:

* **Host Element**
* **Adjacent Element**
* **Exposure**

Then system:

* Sends request to backend
* Returns matched detail
* Displays Suggestions

---

## 🔄 Application Flow

### Initial Load

```
useEffect → getDetails() → setDetails() → Render
```

### Search Flow

```
User Input → searchDetails(q) → Update State → Display Results
```

### Suggestion Flow

```
Select Fields → suggestDetails() → Display Matched Detail + Explanation
```

---

## 📡 API Integration

All API calls use a centralized Axios instance:

```javascript
axiosInstance.get("/details")
axiosInstance.get("/details/search", { params: { q } })
axiosInstance.post("/details/suggest", formData)
```

Base URL is automatically picked from:

```
VITE_BACKEND_URL
```

---

---

# Detail Management System - Backend & Database

A robust **Node.js + Express** backend powered by **PostgreSQL**, built to manage architectural construction details with AI-based suggestions.

---

## 🚀 Tech Stack

* **Node.js** – Runtime environment
* **Express.js** – REST API framework
* **PostgreSQL** – Relational database
* **pg (node-postgres)** – PostgreSQL client
* **@hapi/joi** – Request validation
* **dotenv** – Environment configuration
* **cors** – Cross-origin support

---

## 📦 Backend Installation & Setup

### 🔹 Prerequisites

* Node.js (v16 or higher)
* PostgreSQL (v12 or higher)
* pgAdmin (optional)

---

### 🔹 Steps to Run Backend

1️⃣ **Same Repository**

```bash
git clone <repository-url>
cd backend
```

2️⃣ **Install dependencies**

```bash
npm install
```

If needed manually:

```bash
npm install express pg dotenv cors @hapi/joi
```

3️⃣ **Create `.env` file**

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=Piaxis_local
DB_PASSWORD=your_password
DB_PORT=5432

PORT=5000
```

4️⃣ **Start the server**

```bash
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── detailController.js
├── middleware/
│   └── detailMiddleware.js
├── models/
│   └── detailModel.js
├── routes/
│   └── detailRoutes.js
├── .env
└── server.js
```

---

## 🔧 Core API Endpoints

### 1️⃣ Get All Details

```
GET /api/details
```

* Calls PostgreSQL function: `get_all_details_function()`
* Returns all records from `details` table

---

### 2️⃣ Search Details

```
GET /api/details/search?q=<term>
```

* Validates query using Joi
* Calls: `search_details_function(q)`
* Performs case-insensitive search on:

  * title
  * tags
  * description

---

### 3️⃣ Suggest Detail (AI Rule-Based)

```
POST /api/suggest-detail
```

Body:

```json
{
  "host_element": "External Wall",
  "adjacent_element": "Slab",
  "exposure": "External"
}
```

* Validates request body
* Calls: `suggest_detail_function(host, adjacent, exposure)`
* Returns matched detail with explanation

---

## 🗄️ PostgreSQL Database Setup

### Database Name

```
Piaxis_local
```

---

### Tables

### 1️⃣ `details`

```sql
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
category VARCHAR(255),
tags TEXT,
description TEXT
```

---

### 2️⃣ `detail_usage_rules`

```sql
id SERIAL PRIMARY KEY,
detail_id INTEGER REFERENCES details(id) ON DELETE CASCADE,
host_element VARCHAR(255),
adjacent_element VARCHAR(255),
exposure VARCHAR(255)
```

---

## 🧠 PostgreSQL Functions (PL/pgSQL)

### 1️⃣ `get_all_details_function()`

* Returns all records from `details`

---

### 2️⃣ `search_details_function(p_search TEXT)`

* Case-insensitive search
* Uses `ILIKE`
* Searches title, tags, description

---

### 3️⃣ `suggest_detail_function(p_host_element TEXT, p_adjacent_element TEXT, p_exposure TEXT)`

* Joins `details` + `detail_usage_rules`
* Matches all three fields
* Returns matching detail

---

---

## 🔄 Request Flow Architecture

```
Client
  ↓
Express Server (server.js)
  ↓
Routes (detailRoutes.js)
  ↓
Middleware Validation (Joi)
  ↓
Controller (detailController.js)
  ↓
PostgreSQL Function (via pg Pool)
  ↓
JSON Response
```

---

## 📡 Standard API Response Format

```json
{
  "statuscode": 200,
  "status": "success",
  "data": {},
  "error": [
    {
      "message": "",
      "errorcode": ""
    }
  ]
}
```

---
📌 Assignment Status
✅ Assignment 1 (Mandatory)

Assignment 1 has been successfully completed.

It includes:
-Full Frontend implementation (React + Vite + MUI)
-Backend REST APIs (Node.js + Express)
-PostgreSQL database setup
-Search functionality
-Rule-based detail suggestion
-Proper validation and structured response format

⏳ Assignment 2 (Optional)
-Assignment 2 was optional and has not been implemented in this submission.

