import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import LocationInput from '../components/hospitals/LocationInput';
import HospitalCard from '../components/hospitals/HospitalCard';
import { findNearestHospitals } from '../services/api';

const HospitalLocator = () => {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const handleSearch = async (locationData) => {
    setLoading(true);
    setHospitals([]);

    try {
      const response = await findNearestHospitals(locationData);
      
      if (response.hospitals && response.hospitals.length > 0) {
        setHospitals(response.hospitals);
        setUserLocation({ 
          latitude: locationData.latitude, 
          longitude: locationData.longitude 
        });
        toast.success(`Found ${response.hospitals.length} hospitals near you!`);
      } else {
        toast.info('No hospitals found in your area. Try increasing the search radius.');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error(error.message || 'Failed to find hospitals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setHospitals([]);
    setUserLocation(null);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-2xl mb-4">
              <MapPin className="w-8 h-8 text-[#48BB78]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Find Nearby Hospitals
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Locate the nearest healthcare facilities based on your location.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          {hospitals.length === 0 && !loading && (
            <Card>
              <LocationInput onSubmit={handleSearch} loading={loading} />
            </Card>
          )}

          {/* Loading State */}
          {loading && (
            <Card>
              <Loader message="Finding hospitals near you..." size="default" />
            </Card>
          )}

          {/* Results */}
          {hospitals.length > 0 && !loading && (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {hospitals.length} Hospitals Found
                  </h2>
                  {userLocation && (
                    <p className="text-gray-600 text-sm mt-1">
                      Near {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleNewSearch}
                  className="text-[#2B6CB0] font-semibold hover:underline"
                >
                  ← New Search
                </button>
              </div>

              {/* Hospital List */}
              <div className="space-y-4">
                {hospitals.map((hospital, index) => (
                  <HospitalCard 
                    key={index} 
                    hospital={hospital} 
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {hospitals.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="text-center py-12" hover={false}>
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  Enter your location to find nearby hospitals
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HospitalLocator;
