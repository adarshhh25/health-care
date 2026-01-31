# 🏥 Rural Healthcare AI - Smart Screening & Hospital Locator

> **Bridging the gap in rural healthcare access with AI-powered diagnostics and resource location.**

![Status](https://img.shields.io/badge/Status-Active-success)
![Tech](https://img.shields.io/badge/Stack-MERN%20%2B%20Gemini%20AI-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📖 Introduction

**Rural Healthcare AI** is a comprehensive platform designed to assist users in underserved and rural areas. It combines advanced AI for preliminary medical screening with a robust geolocation system to find nearby medical facilities. The platform is built to be accessible, supporting multiple local languages (Hindi, Marathi, Bengali) and featuring a simple, mobile-first interface.

---

## ✨ Key Features

### 🤖 AI-Powered Health Screening
- **Symptom Checker**: Users can describe their symptoms in natural language.
- **Image Analysis**: Upload photos of visible symptoms or medical reports for AI assessment.
- **Follow-up Q&A**: Interactive chat to refine invalid or vague queries.
- **Powered by Google Gemini Pro & Vision**: Utilizes state-of-the-art LLMs for accurate medical context.

### 📍 Hospital Locator Service
- **Geospatial Search**: Finds hospitals within a specific radius of the user's location.
- **Directory Database**: Built-in database of over 10,000+ hospitals.
- **Smart Filtering**: Filter by distance and type.
- **Directions & Contact**: Direct integration with Google Maps and click-to-call functionality.

### 🌐 Multilingual Accessibility
- **Full Localization**: The entire UI and AI responses are available in:
  - 🇺🇸 English
  - 🇮🇳 Hindi (हिंदी)
  - 🇮🇳 Marathi (मराठी)
  - 🇮🇳 Bengali (বাংলা)
- **Automatic Language Detection**: Detects user preference automatically.

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Sleek, modern, and trustworthy aesthetic.
- **Responsive**: Fully optimized for mobile devices, critical for rural adoption.
- **Animations**: Smooth transitions using Framer Motion.

---

## 🏗️ System Architecture

The project follows a modern **Client-Server Architecture**:

### **Frontend (Client)**
- **Framework**: [React.js](https://react.dev/) (v19) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **State/Routing**: React Router DOM
- **Internationalization**: `i18next` & `react-i18next`
- **Animations**: Framer Motion
- **Icons**: Lucide React

### **Backend (Server)**
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
- **Data Handling**: `csv-parser` for loading hospital data.
- **File Handling**: `multer` for image uploads.

### **Data Flow**
1.  **Symptom Analysis**: Client -> POST `/api/analyze-symptoms` -> Server -> Gemini API -> Response.
2.  **Hospital Search**: Client -> POST `/api/hospitals` -> Server (Filters CSV Data) -> Response.
3.  **Image Analysis**: Client -> POST `/api/analyze-image` -> Server (Multer) -> Gemini Vision API -> Response.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/rural-health-ai.git
cd rural-health-ai
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the server:
```bash
npm start
# Input: Server running on port 3000
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
# Input: Local: http://localhost:5173/
```

---

## 📡 API Documentation

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/analyze-symptoms` | Analyze text symptoms | `{ symptoms: "fever...", language: "en", age: 25... }` |
| **POST** | `/api/follow-up` | Chat context for follow-up | `{ history: [...], question: "...", language: "en" }` |
| **POST** | `/api/analyze-image` | Analyze medical image | `FormData` (file: image, prompt: text) |
| **POST** | `/api/hospitals` | Find nearby hospitals | `{ latitude: 28.7, longitude: 77.1, limit: 10 }` |

---

## 📂 Directory Structure

```graphql
Health-Care/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # UI Components (Forms, Cards, Layouts)
│   │   ├── services/       # API Services (Axios)
│   │   ├── locales/        # JSON Translation Files (en, hi, mr, bn)
│   │   ├── pages/          # Main Pages (Home, HospitalLocator, etc.)
│   │   └── App.jsx         # Main App Component
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── data/               # CSV Data (hospital_directory.csv)
│   ├── services/           # Business Logic (csvLoader.js)
│   ├── server.js           # Entry Point & Routes
│   └── package.json
│
└── Readme.md               # Project Documentation
```

---

## 🛡️ Disclaimer

> [!IMPORTANT]
> **Medical Disclaimer**: This AI-powered tool is for **informational purposes only**. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any medical concerns.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👥 Authors

- **Adarsh Jha**
- **Author Name**
- **Author Name**
- **Author Name**
