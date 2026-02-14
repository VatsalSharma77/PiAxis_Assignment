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

