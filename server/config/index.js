/**
 * Configuration Module
 * Centralized configuration management for the application
 */

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Gemini AI Configuration
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',

  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',

  // File Upload Configuration
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB

  // Hospital Search Configuration
  DEFAULT_HOSPITAL_LIMIT: 5,
  MAX_HOSPITAL_LIMIT: 20,
  DEFAULT_SEARCH_RADIUS_KM: 50,
  MAX_SEARCH_RADIUS_KM: 500,

  // API Configuration
  API_VERSION: '1.0.0',
  API_PREFIX: '/api'
};
