/**
 * Symptom Analysis Routes
 * POST /api/analyze-symptoms - Analyze user symptoms using Gemini AI
 */

const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

/**
 * POST /api/analyze-symptoms
 * Analyzes symptoms and provides health guidance
 * 
 * Request Body:
 * {
 *   age: Number (optional),
 *   gender: String (optional),
 *   symptoms: String (required),
 *   duration: String (optional)
 * }
 * 
 * Response:
 * {
 *   success: Boolean,
 *   data: {
 *     possible_causes: Array<String>,
 *     severity: String,
 *     care_advice: String,
 *     doctor_visit_needed: Boolean,
 *     emergency: Boolean,
 *     follow_up_questions: Array<String>,
 *     disclaimer: String
 *   },
 *   emergency_alert: Boolean
 * }
 */
router.post('/analyze-symptoms', async (req, res) => {
  try {
    const { age, gender, symptoms, duration } = req.body;

    // Validate required fields
    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Symptoms are required',
        message: 'Please provide a description of your symptoms'
      });
    }

    // Validate symptoms length
    if (symptoms.length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Symptoms description too long',
        message: 'Please limit your symptoms description to 2000 characters'
      });
    }

    // Quick emergency check
    const isEmergency = geminiService.quickEmergencyCheck(symptoms);
    
    if (isEmergency) {
      console.warn('⚠️  EMERGENCY SYMPTOMS DETECTED');
    }

    // Prepare symptom data
    const symptomData = {
      age: age || null,
      gender: gender || null,
      symptoms: symptoms.trim(),
      duration: duration || null
    };

    console.log(`Analyzing symptoms: ${symptoms.substring(0, 50)}...`);

    // Call Gemini AI service
    const analysis = await geminiService.analyzeSymptoms(symptomData);

    // Build response
    const response = {
      success: true,
      data: analysis,
      emergency_alert: analysis.emergency || isEmergency,
      timestamp: new Date().toISOString()
    };

    // If emergency detected, add urgent message
    if (response.emergency_alert) {
      response.urgent_message = '🚨 EMERGENCY DETECTED: Please seek immediate medical attention or call emergency services!';
    }

    res.json(response);

  } catch (error) {
    console.error('Error analyzing symptoms:', error);

    // Handle specific error types
    if (error.message.includes('not configured')) {
      return res.status(503).json({
        success: false,
        error: 'AI service unavailable',
        message: 'The symptom analysis service is currently unavailable. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze symptoms',
      message: error.message
    });
  }
});

/**
 * GET /api/symptoms/emergency-keywords
 * Returns list of emergency keywords for client-side quick checks
 */
router.get('/symptoms/emergency-keywords', (req, res) => {
  try {
    const keywords = geminiService.getEmergencyKeywords();
    
    res.json({
      success: true,
      data: {
        keywords: keywords,
        message: 'If any of these symptoms are present, seek immediate medical attention'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve emergency keywords'
    });
  }
});

/**
 * POST /api/symptoms/check-emergency
 * Quick emergency check without full AI analysis
 */
router.post('/symptoms/check-emergency', (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({
        success: false,
        error: 'Symptoms are required'
      });
    }

    const isEmergency = geminiService.quickEmergencyCheck(symptoms);

    res.json({
      success: true,
      data: {
        is_emergency: isEmergency,
        message: isEmergency 
          ? 'Emergency symptoms detected. Seek immediate medical attention!'
          : 'No immediate emergency keywords detected. However, if you feel this is urgent, please seek medical help.',
        disclaimer: 'This is a basic keyword check and not a complete medical assessment.'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check emergency status'
    });
  }
});

module.exports = router;
