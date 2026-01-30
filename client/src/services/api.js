/**
 * API Service Layer
 * Handles all backend API calls for the Rural Healthcare AI Platform
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Analyze symptoms using AI
 * @param {Object} symptomData - { age, gender, symptoms, duration }
 * @returns {Promise} AI analysis response
 */
export const analyzeSymptoms = async (symptomData) => {
  try {
    const response = await api.post('/analyze-symptoms', symptomData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Find nearest hospitals based on user location
 * @param {Object} location - { latitude, longitude, limit }
 * @returns {Promise} List of nearest hospitals
 */
export const getNearestHospitals = async (location) => {
  try {
    const response = await api.post('/nearest-hospitals', location);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Find hospitals within a specific radius
 * @param {Object} params - { latitude, longitude, radius_km }
 * @returns {Promise} List of hospitals within radius
 */
export const getHospitalsWithinRadius = async (params) => {
  try {
    const response = await api.post('/hospitals/within-radius', params);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Analyze medical image using AI
 * @param {File} imageFile - Image file to analyze
 * @param {String} description - Optional description
 * @returns {Promise} AI image analysis response
 */
export const analyzeImage = async (imageFile, description = '') => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (description) {
      formData.append('description', description);
    }

    const response = await axios.post(`${BASE_URL}/analyze-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 seconds for image upload
    });

    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Quick emergency check
 * @param {String} symptoms - Symptom description
 * @returns {Promise} Emergency status
 */
export const checkEmergency = async (symptoms) => {
  try {
    const response = await api.post('/symptoms/check-emergency', { symptoms });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get list of emergency keywords
 * @returns {Promise} Emergency keywords
 */
export const getEmergencyKeywords = async () => {
  try {
    const response = await api.get('/symptoms/emergency-keywords');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get all hospitals (with optional search)
 * @param {String} searchQuery - Optional search query
 * @returns {Promise} Hospital list
 */
export const getAllHospitals = async (searchQuery = '') => {
  try {
    const url = searchQuery
      ? `/hospitals/all?search=${encodeURIComponent(searchQuery)}`
      : '/hospitals/all';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get hospital count
 * @returns {Promise} Hospital count
 */
export const getHospitalCount = async () => {
  try {
    const response = await api.get('/hospitals/count');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get server health status
 * @returns {Promise} Server health
 */
export const getHealthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:3000/health');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Handle API errors
 * @param {Error} error - Axios error
 * @returns {Object} Formatted error
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      success: false,
      message: error.response.data?.message || error.response.data?.error || 'Server error occurred',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      success: false,
      message: 'Unable to connect to server. Please check your connection.',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  }
};

export default {
  analyzeSymptoms,
  getNearestHospitals,
  getHospitalsWithinRadius,
  analyzeImage,
  checkEmergency,
  getEmergencyKeywords,
  getAllHospitals,
  getHospitalCount,
  getHealthStatus,
};
