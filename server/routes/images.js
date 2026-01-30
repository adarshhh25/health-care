/**
 * Image Analysis Routes
 * POST /api/analyze-image - Analyze medical images using Gemini Vision AI
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const geminiService = require('../services/geminiService');

// Configure multer for image upload
// Store images in memory as Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files are allowed (JPEG, PNG, GIF, WebP, BMP)'));
    }
  }
});

/**
 * POST /api/analyze-image
 * Analyze medical image using Gemini Vision
 * 
 * Request:
 * - Content-Type: multipart/form-data
 * - Body: image file (form field name: 'image')
 * - Optional: description (text description of symptoms)
 * 
 * Response:
 * {
 *   success: Boolean,
 *   data: {
 *     description: String,
 *     concerns: Array<String>,
 *     medical_attention_recommended: Boolean,
 *     advice: String,
 *     disclaimer: String
 *   }
 * }
 */
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image provided',
        message: 'Please upload an image file'
      });
    }

    const { description } = req.body;

    console.log(`Analyzing image: ${req.file.originalname} (${req.file.size} bytes)`);

    // Analyze image using Gemini Vision
    const analysis = await geminiService.analyzeImage(
      req.file.buffer,
      req.file.mimetype
    );

    // Build response
    const response = {
      success: true,
      data: {
        ...analysis,
        image_info: {
          filename: req.file.originalname,
          size_bytes: req.file.size,
          mime_type: req.file.mimetype
        }
      },
      user_description: description || null,
      timestamp: new Date().toISOString()
    };

    // Add urgent message if medical attention recommended
    if (analysis.medical_attention_recommended) {
      response.recommendation = '⚠️ Medical attention is recommended. Please consult a healthcare professional.';
    }

    res.json(response);

  } catch (error) {
    console.error('Error analyzing image:', error);

    // Handle specific error types
    if (error.message.includes('not configured')) {
      return res.status(503).json({
        success: false,
        error: 'AI service unavailable',
        message: 'The image analysis service is currently unavailable. Please try again later.'
      });
    }

    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid file type',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze image',
      message: error.message
    });
  }
});

/**
 * Error handler for multer file upload errors
 */
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large',
        message: 'Image file size must not exceed 10MB'
      });
    }
    
    return res.status(400).json({
      success: false,
      error: 'File upload error',
      message: error.message
    });
  }

  next(error);
});

/**
 * GET /api/image-info
 * Get information about supported image formats
 */
router.get('/image-info', (req, res) => {
  res.json({
    success: true,
    data: {
      supported_formats: ['JPEG', 'JPG', 'PNG', 'GIF', 'WebP', 'BMP'],
      max_file_size_mb: 10,
      upload_field_name: 'image',
      endpoint: 'POST /api/analyze-image',
      usage: {
        description: 'Upload an image for AI-powered analysis',
        method: 'POST',
        content_type: 'multipart/form-data',
        fields: {
          image: 'Required - Image file to analyze',
          description: 'Optional - Text description of symptoms visible in image'
        }
      },
      important_notes: [
        'This is NOT a diagnostic tool',
        'AI cannot replace professional medical examination',
        'Always consult a healthcare provider for proper diagnosis',
        'Image analysis is for informational purposes only'
      ]
    }
  });
});

module.exports = router;
