# Rural Healthcare AI Screening Platform - Backend

A comprehensive backend system for rural healthcare that uses AI-powered symptom analysis, emergency detection, and hospital location services. Built with Node.js, Express, and Google's Gemini AI.

## 🌟 Features

- **AI Symptom Analysis**: Analyze user symptoms using Gemini AI with medical safety guardrails
- **Emergency Detection**: Quick identification of emergency symptoms requiring immediate care
- **Hospital Finder**: Find nearest hospitals using geolocation and Haversine distance calculation
- **Image Analysis**: Analyze medical images using Gemini Vision AI
- **Safety-First Design**: Non-diagnostic, includes disclaimers, encourages professional medical consultation
- **Fast Performance**: In-memory CSV data loading for quick hospital searches
- **RESTful API**: Clean, structured JSON responses

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone or Navigate to Project Directory

```bash
cd Health-Care/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_actual_gemini_api_key_here
CORS_ORIGIN=*
```

### 4. Prepare Hospital Data

Ensure your `hospital_directory.csv` has the following columns:
- `name` or `hospital_name` - Hospital name
- `address` or `location` - Hospital address
- `latitude` or `lat` - Latitude coordinate
- `longitude` or `lon` - Longitude coordinate

Example CSV format:
```csv
name,address,latitude,longitude
City General Hospital,123 Main St,40.7128,-74.0060
Rural Health Center,456 Oak Ave,41.8781,-87.6298
```

### 5. Start the Server

```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check

```http
GET /health
```

Returns server status and hospital data count.

**Response:**
```json
{
  "status": "ok",
  "message": "Rural Healthcare AI Backend is running",
  "timestamp": "2026-01-30T10:30:00.000Z",
  "hospitalsLoaded": 150
}
```

---

### 1️⃣ Analyze Symptoms

Analyze user symptoms and get health guidance using AI.

```http
POST /api/analyze-symptoms
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": 35,
  "gender": "male",
  "symptoms": "severe headache with fever and body aches for 2 days",
  "duration": "2 days"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "possible_causes": [
      "Viral infection (flu, common cold)",
      "Bacterial infection",
      "Dehydration",
      "Tension headache with fever"
    ],
    "severity": "moderate",
    "care_advice": "Rest, stay hydrated, monitor temperature, take over-the-counter fever reducers if needed",
    "doctor_visit_needed": true,
    "emergency": false,
    "follow_up_questions": [
      "Do you have a stiff neck?",
      "Any rash or skin changes?",
      "Is the headache the worst you've ever experienced?"
    ],
    "disclaimer": "This AI screening is not a substitute for professional medical advice..."
  },
  "emergency_alert": false,
  "timestamp": "2026-01-30T10:30:00.000Z"
}
```

**Emergency Response:**
```json
{
  "success": true,
  "data": {
    "possible_causes": ["Cardiac emergency", "Acute coronary syndrome"],
    "severity": "emergency",
    "emergency": true,
    ...
  },
  "emergency_alert": true,
  "urgent_message": "🚨 EMERGENCY DETECTED: Please seek immediate medical attention or call emergency services!"
}
```

---

### 2️⃣ Find Nearest Hospitals

Find hospitals closest to a user's location.

```http
POST /api/nearest-hospitals
Content-Type: application/json
```

**Request Body:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "limit": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_location": {
      "latitude": 40.7128,
      "longitude": -74.006
    },
    "total_hospitals_found": 5,
    "total_hospitals_available": 150,
    "hospitals": [
      {
        "name": "City General Hospital",
        "address": "123 Main St, New York, NY",
        "latitude": 40.7135,
        "longitude": -74.0065,
        "distance_km": 0.87,
        "distance_formatted": "0.9 km"
      },
      {
        "name": "Downtown Medical Center",
        "address": "456 Park Ave, New York, NY",
        "latitude": 40.7200,
        "longitude": -74.0100,
        "distance_km": 1.25,
        "distance_formatted": "1.3 km"
      }
    ]
  },
  "timestamp": "2026-01-30T10:30:00.000Z"
}
```

---

### 3️⃣ Analyze Medical Image

Analyze medical images using AI vision.

```http
POST /api/analyze-image
Content-Type: multipart/form-data
```

**Request:**
- **Field:** `image` (file) - Image file (JPEG, PNG, GIF, WebP, BMP)
- **Field:** `description` (optional text) - Additional context

**Example using curl:**
```bash
curl -X POST http://localhost:3000/api/analyze-image \
  -F "image=@photo.jpg" \
  -F "description=rash on arm for 3 days"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "description": "The image shows reddened skin with small raised bumps...",
    "concerns": [
      "Visible skin irritation",
      "Inflammation present"
    ],
    "medical_attention_recommended": true,
    "advice": "Based on the visible symptoms, it's recommended to consult a dermatologist for proper diagnosis",
    "disclaimer": "This image analysis is not a substitute for professional medical diagnosis...",
    "image_info": {
      "filename": "photo.jpg",
      "size_bytes": 245678,
      "mime_type": "image/jpeg"
    }
  },
  "user_description": "rash on arm for 3 days",
  "recommendation": "⚠️ Medical attention is recommended. Please consult a healthcare professional.",
  "timestamp": "2026-01-30T10:30:00.000Z"
}
```

---

### Additional Endpoints

#### Get All Hospitals
```http
GET /api/hospitals/all?search=general
```

#### Get Hospital Count
```http
GET /api/hospitals/count
```

#### Find Hospitals Within Radius
```http
POST /api/hospitals/within-radius
Content-Type: application/json

{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "radius_km": 50
}
```

#### Emergency Keywords List
```http
GET /api/symptoms/emergency-keywords
```

#### Quick Emergency Check
```http
POST /api/symptoms/check-emergency
Content-Type: application/json

{
  "symptoms": "chest pain and difficulty breathing"
}
```

#### Image Upload Info
```http
GET /api/image-info
```

## 📁 Project Structure

```
Health-Care/
├── server.js                 # Main application entry point
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables (create from .env.example)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── hospital_directory.csv    # Hospital data
├── config/
│   └── index.js              # Configuration management
├── routes/
│   ├── symptoms.js           # Symptom analysis endpoints
│   ├── hospitals.js          # Hospital finder endpoints
│   └── images.js             # Image analysis endpoints
├── services/
│   ├── csvLoader.js          # CSV data loader
│   └── geminiService.js      # Gemini AI integration
└── utils/
    └── distanceCalculator.js # Haversine distance calculator
```

## 🔒 Safety Features

### Medical Safety Guardrails
- ❌ **No Diagnosis**: System explicitly avoids providing medical diagnoses
- ❌ **No Prescriptions**: Never recommends specific medications
- ⚠️ **Emergency Detection**: Identifies life-threatening symptoms
- 📋 **Disclaimers**: Every response includes medical disclaimers
- 👨‍⚕️ **Doctor Recommendations**: Encourages professional medical consultation
- 🗣️ **Simple Language**: Uses non-technical terms for rural users

### Emergency Keywords Detected
- Chest pain
- Difficulty breathing
- Severe bleeding
- Loss of consciousness
- Stroke symptoms
- Severe allergic reactions
- And more...

## 🛠️ Development

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Run in Development Mode
```bash
npm run dev
```

### Testing APIs
Use tools like:
- **Postman**: Import API endpoints and test
- **curl**: Command-line testing
- **Thunder Client**: VS Code extension

Example curl test:
```bash
# Health check
curl http://localhost:3000/health

# Analyze symptoms
curl -X POST http://localhost:3000/api/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"symptoms": "fever and cough", "age": 30, "duration": "3 days"}'

# Find hospitals
curl -X POST http://localhost:3000/api/nearest-hospitals \
  -H "Content-Type: application/json" \
  -d '{"latitude": 40.7128, "longitude": -74.0060, "limit": 3}'
```

## 🌐 CORS Configuration

By default, CORS is enabled for all origins (`*`). For production, configure specific domains in `.env`:

```env
CORS_ORIGIN=https://yourdomain.com
```

## 📊 CSV Data Requirements

Your `hospital_directory.csv` must include:

| Column | Required | Description |
|--------|----------|-------------|
| name | ✅ | Hospital name |
| address | ✅ | Full address |
| latitude | ✅ | Latitude (-90 to 90) |
| longitude | ✅ | Longitude (-180 to 180) |

Hospitals without valid coordinates are automatically filtered out.

## ⚡ Performance Optimizations

- **In-Memory Storage**: Hospital data loaded once at startup
- **Fast Queries**: Haversine calculation optimized for speed
- **Async AI Calls**: Non-blocking Gemini API requests
- **Efficient CSV Parsing**: Streaming CSV parser

## 🚫 Error Handling

The API returns structured error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad request (invalid input)
- `404` - Endpoint not found
- `500` - Internal server error
- `503` - Service unavailable (AI not configured)

## 🔮 Future Extensions

Planned features:
- **Multilingual Support**: Support for regional languages
- **Offline Mode**: Cache responses for offline access
- **Telemedicine Integration**: Connect with video consultation services
- **SMS Notifications**: Send hospital info via SMS
- **Voice Input**: Accept voice descriptions of symptoms
- **Database Integration**: Replace CSV with proper database
- **Authentication**: Add user authentication and session management

## 📝 License

ISC License

## 🤝 Contributing

This is a backend-only system designed for rural healthcare. Contributions welcome for:
- Additional safety checks
- Performance improvements
- Better error handling
- Documentation updates

## ⚠️ Important Disclaimers

**This system is NOT a replacement for professional medical care:**
- Not intended for diagnosis
- Not a substitute for doctor visits
- AI responses are guidance only
- Always consult healthcare professionals
- Call emergency services for life-threatening situations

## 🆘 Support

For issues or questions:
1. Check the API endpoints are correctly configured
2. Verify Gemini API key is valid
3. Ensure CSV file has correct format
4. Check server logs for detailed errors

## 🎯 Use Cases

Perfect for:
- Rural healthcare screening centers
- Telemedicine platforms
- Health information kiosks
- Community health workers
- Remote patient triage
- Healthcare accessibility initiatives

---

**Built with ❤️ for Rural Healthcare**

*Making healthcare information accessible to underserved communities*
