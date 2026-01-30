/**
 * Hospital Finder Routes
 * POST /api/nearest-hospitals - Find nearest hospitals based on user location
 */

const express = require('express');
const router = express.Router();
const csvLoader = require('../services/csvLoader');
const distanceCalculator = require('../utils/distanceCalculator');

/**
 * POST /api/nearest-hospitals
 * Finds nearest hospitals to user's location
 * 
 * Request Body:
 * {
 *   latitude: Number (required),
 *   longitude: Number (required),
 *   limit: Number (optional, default: 5, max: 20)
 * }
 * 
 * Response:
 * {
 *   success: Boolean,
 *   data: {
 *     user_location: { latitude, longitude },
 *     total_hospitals: Number,
 *     hospitals: [
 *       {
 *         name: String,
 *         address: String,
 *         latitude: Number,
 *         longitude: Number,
 *         distance_km: Number
 *       }
 *     ]
 *   }
 * }
 */
router.post('/nearest-hospitals', (req, res) => {
  try {
    const { latitude, longitude, limit } = req.body;

    // Validate required fields
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Both latitude and longitude are required'
      });
    }

    // Convert to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Validate coordinates
    if (!distanceCalculator.validateCoordinates(lat, lon)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates',
        message: 'Latitude must be between -90 and 90, longitude between -180 and 180'
      });
    }

    // Validate and set limit
    let resultLimit = parseInt(limit) || 5;
    if (resultLimit < 1) resultLimit = 5;
    if (resultLimit > 20) resultLimit = 20;

    // Get all hospitals
    const hospitals = csvLoader.getAllHospitals();

    if (hospitals.length === 0) {
      return res.status(503).json({
        success: false,
        error: 'No hospital data available',
        message: 'Hospital directory is empty or not loaded'
      });
    }

    console.log(`Finding nearest hospitals to coordinates: ${lat}, ${lon}`);

    // Find nearest hospitals
    const nearestHospitals = distanceCalculator.findNearest(
      lat,
      lon,
      hospitals,
      resultLimit
    );

    // Format response
    const response = {
      success: true,
      data: {
        user_location: {
          latitude: lat,
          longitude: lon
        },
        total_hospitals_found: nearestHospitals.length,
        total_hospitals_available: hospitals.length,
        hospitals: nearestHospitals.map(hospital => ({
          name: hospital.name,
          address: hospital.address,
          latitude: hospital.latitude,
          longitude: hospital.longitude,
          distance_km: hospital.distance_km,
          distance_formatted: distanceCalculator.formatDistance(hospital.distance_km)
        }))
      },
      timestamp: new Date().toISOString()
    };

    res.json(response);

  } catch (error) {
    console.error('Error finding nearest hospitals:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to find nearest hospitals',
      message: error.message
    });
  }
});

/**
 * GET /api/hospitals/all
 * Get all hospitals in the directory
 * Optional query params: search (filter by name)
 */
router.get('/hospitals/all', (req, res) => {
  try {
    const { search } = req.query;

    let hospitals = csvLoader.getAllHospitals();

    // Apply search filter if provided
    if (search && search.trim() !== '') {
      hospitals = csvLoader.searchByName(search.trim());
    }

    res.json({
      success: true,
      data: {
        total: hospitals.length,
        hospitals: hospitals
      }
    });

  } catch (error) {
    console.error('Error retrieving hospitals:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve hospitals',
      message: error.message
    });
  }
});

/**
 * GET /api/hospitals/count
 * Get total count of hospitals in directory
 */
router.get('/hospitals/count', (req, res) => {
  try {
    const count = csvLoader.getHospitalCount();
    
    res.json({
      success: true,
      data: {
        total_hospitals: count,
        status: count > 0 ? 'loaded' : 'empty'
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get hospital count'
    });
  }
});

/**
 * POST /api/hospitals/within-radius
 * Find hospitals within a specific radius
 * 
 * Request Body:
 * {
 *   latitude: Number,
 *   longitude: Number,
 *   radius_km: Number (default: 50)
 * }
 */
router.post('/hospitals/within-radius', (req, res) => {
  try {
    const { latitude, longitude, radius_km } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Both latitude and longitude are required'
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const radius = parseFloat(radius_km) || 50;

    if (!distanceCalculator.validateCoordinates(lat, lon)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates'
      });
    }

    if (radius <= 0 || radius > 500) {
      return res.status(400).json({
        success: false,
        error: 'Invalid radius',
        message: 'Radius must be between 1 and 500 km'
      });
    }

    const hospitals = csvLoader.getAllHospitals();

    // Filter hospitals within radius
    const hospitalsInRadius = hospitals
      .map(hospital => {
        const distance = distanceCalculator.calculateDistance(
          lat, lon,
          hospital.latitude, hospital.longitude
        );
        return { ...hospital, distance_km: Math.round(distance * 100) / 100 };
      })
      .filter(hospital => hospital.distance_km <= radius)
      .sort((a, b) => a.distance_km - b.distance_km);

    res.json({
      success: true,
      data: {
        search_location: { latitude: lat, longitude: lon },
        search_radius_km: radius,
        hospitals_found: hospitalsInRadius.length,
        hospitals: hospitalsInRadius
      }
    });

  } catch (error) {
    console.error('Error finding hospitals within radius:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to find hospitals within radius',
      message: error.message
    });
  }
});

/**
 * POST /api/hospitals/reload
 * Reload hospital data from CSV (useful for updates)
 */
router.post('/hospitals/reload', async (req, res) => {
  try {
    console.log('Reloading hospital data from CSV...');
    await csvLoader.reload();
    
    res.json({
      success: true,
      message: 'Hospital data reloaded successfully',
      data: {
        total_hospitals: csvLoader.getHospitalCount()
      }
    });

  } catch (error) {
    console.error('Error reloading hospitals:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to reload hospital data',
      message: error.message
    });
  }
});

module.exports = router;
