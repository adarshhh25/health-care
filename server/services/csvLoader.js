/**
 * CSV Loader Service
 * Loads and manages hospital directory data from CSV file
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class CSVLoader {
  constructor() {
    this.hospitals = [];
    this.csvPath = path.join(__dirname, '..', 'hospital_directory.csv');
  }

  /**
   * Load hospitals from CSV file into memory
   * Filters out hospitals without valid coordinates
   */
  async loadHospitals() {
    return new Promise((resolve, reject) => {
      const hospitals = [];
      
      // Check if CSV file exists
      if (!fs.existsSync(this.csvPath)) {
        return reject(new Error(`CSV file not found at: ${this.csvPath}`));
      }

      fs.createReadStream(this.csvPath)
        .pipe(csv())
        .on('data', (row) => {
          try {
            // Extract hospital data from CSV row
            let latitude = NaN;
            let longitude = NaN;
            
            // Try to parse from Location_Coordinates column (format: "lat, lon")
            if (row.Location_Coordinates && row.Location_Coordinates.trim()) {
              const coords = row.Location_Coordinates.split(',').map(c => c.trim());
              if (coords.length === 2) {
                latitude = parseFloat(coords[0]);
                longitude = parseFloat(coords[1]);
              }
            }
            
            // Fallback to individual columns if Location_Coordinates not found
            if (isNaN(latitude) || isNaN(longitude)) {
              latitude = parseFloat(row.latitude || row.Latitude || row.lat || row.Lat);
              longitude = parseFloat(row.longitude || row.Longitude || row.lon || row.Lon || row.lng || row.Lng);
            }
            
            const hospital = {
              name: row.Hospital_Name || row.name || row.Name || row.hospital_name || row['Hospital Name'] || 'Unknown Hospital',
              address: row.Address_Original_First_Line || row.address || row.Address || row.location || row.Location || 'Address not available',
              latitude: latitude,
              longitude: longitude
            };

            // Only add hospitals with valid coordinates
            if (!isNaN(hospital.latitude) && !isNaN(hospital.longitude)) {
              // Validate coordinate ranges
              if (hospital.latitude >= -90 && hospital.latitude <= 90 &&
                  hospital.longitude >= -180 && hospital.longitude <= 180) {
                hospitals.push(hospital);
              }
            }
          } catch (error) {
            console.error('Error parsing CSV row:', error.message);
          }
        })
        .on('end', () => {
          this.hospitals = hospitals;
          console.log(`Successfully loaded ${hospitals.length} hospitals with valid coordinates`);
          resolve(hospitals);
        })
        .on('error', (error) => {
          console.error('Error reading CSV file:', error);
          reject(error);
        });
    });
  }

  /**
   * Get all hospitals
   * @returns {Array} Array of hospital objects
   */
  getAllHospitals() {
    return this.hospitals;
  }

  /**
   * Get hospital count
   * @returns {Number} Total number of hospitals loaded
   */
  getHospitalCount() {
    return this.hospitals.length;
  }

  /**
   * Search hospitals by name
   * @param {String} searchTerm - Search term for hospital name
   * @returns {Array} Filtered hospitals
   */
  searchByName(searchTerm) {
    if (!searchTerm) return this.hospitals;
    
    const term = searchTerm.toLowerCase();
    return this.hospitals.filter(hospital => 
      hospital.name.toLowerCase().includes(term)
    );
  }

  /**
   * Get hospitals within a bounding box
   * @param {Object} bounds - {minLat, maxLat, minLon, maxLon}
   * @returns {Array} Hospitals within bounds
   */
  getHospitalsInBounds(bounds) {
    const { minLat, maxLat, minLon, maxLon } = bounds;
    
    return this.hospitals.filter(hospital => 
      hospital.latitude >= minLat &&
      hospital.latitude <= maxLat &&
      hospital.longitude >= minLon &&
      hospital.longitude <= maxLon
    );
  }

  /**
   * Reload hospitals from CSV (useful for updates)
   */
  async reload() {
    console.log('Reloading hospital data from CSV...');
    return await this.loadHospitals();
  }
}

// Export singleton instance
const csvLoader = new CSVLoader();
module.exports = csvLoader;
