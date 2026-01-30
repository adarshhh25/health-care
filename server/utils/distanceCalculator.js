/**
 * Distance Calculator Utility
 * Implements Haversine formula for calculating distances between geographic coordinates
 */

/**
 * Calculate distance between two points using Haversine formula
 * @param {Number} lat1 - Latitude of point 1
 * @param {Number} lon1 - Longitude of point 1
 * @param {Number} lat2 - Latitude of point 2
 * @param {Number} lon2 - Longitude of point 2
 * @returns {Number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Earth's radius in kilometers
  const R = 6371;

  // Convert degrees to radians
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  // Haversine formula
  const a = 
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;

  return distance;
}

/**
 * Convert degrees to radians
 * @param {Number} degrees
 * @returns {Number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 * @param {Number} radians
 * @returns {Number} Degrees
 */
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * Find nearest locations from a user's position
 * @param {Number} userLat - User's latitude
 * @param {Number} userLon - User's longitude
 * @param {Array} locations - Array of location objects with latitude and longitude
 * @param {Number} limit - Maximum number of results to return (default: 5)
 * @returns {Array} Sorted array of locations with distance
 */
function findNearest(userLat, userLon, locations, limit = 5) {
  // Validate user coordinates
  if (typeof userLat !== 'number' || typeof userLon !== 'number') {
    throw new Error('Invalid user coordinates');
  }

  if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
    throw new Error('User coordinates out of valid range');
  }

  if (!Array.isArray(locations) || locations.length === 0) {
    return [];
  }

  // Calculate distance for each location
  const locationsWithDistance = locations.map(location => {
    const distance = calculateDistance(
      userLat,
      userLon,
      location.latitude,
      location.longitude
    );

    return {
      ...location,
      distance_km: Math.round(distance * 100) / 100 // Round to 2 decimal places
    };
  });

  // Sort by distance (nearest first)
  locationsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

  // Return top N results
  return locationsWithDistance.slice(0, limit);
}

/**
 * Calculate bounding box for a given point and radius
 * Useful for filtering locations before distance calculation
 * @param {Number} lat - Center latitude
 * @param {Number} lon - Center longitude
 * @param {Number} radiusKm - Radius in kilometers
 * @returns {Object} Bounding box {minLat, maxLat, minLon, maxLon}
 */
function getBoundingBox(lat, lon, radiusKm) {
  const R = 6371; // Earth's radius in km
  
  // Calculate lat/lon ranges
  const latRange = toDegrees(radiusKm / R);
  const lonRange = toDegrees(radiusKm / R / Math.cos(toRadians(lat)));

  return {
    minLat: lat - latRange,
    maxLat: lat + latRange,
    minLon: lon - lonRange,
    maxLon: lon + lonRange
  };
}

/**
 * Check if a point is within a radius of another point
 * @param {Number} lat1 - Latitude of center point
 * @param {Number} lon1 - Longitude of center point
 * @param {Number} lat2 - Latitude of point to check
 * @param {Number} lon2 - Longitude of point to check
 * @param {Number} radiusKm - Radius in kilometers
 * @returns {Boolean} True if within radius
 */
function isWithinRadius(lat1, lon1, lat2, lon2, radiusKm) {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return distance <= radiusKm;
}

/**
 * Format distance for display
 * @param {Number} distanceKm - Distance in kilometers
 * @returns {String} Formatted distance string
 */
function formatDistance(distanceKm) {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} meters`;
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  } else {
    return `${Math.round(distanceKm)} km`;
  }
}

/**
 * Validate coordinates
 * @param {Number} lat - Latitude
 * @param {Number} lon - Longitude
 * @returns {Boolean} True if valid
 */
function validateCoordinates(lat, lon) {
  return (
    typeof lat === 'number' &&
    typeof lon === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180 &&
    !isNaN(lat) &&
    !isNaN(lon)
  );
}

module.exports = {
  calculateDistance,
  findNearest,
  getBoundingBox,
  isWithinRadius,
  formatDistance,
  validateCoordinates,
  toRadians,
  toDegrees
};
