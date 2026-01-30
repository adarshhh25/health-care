import { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, Search, Map } from 'lucide-react';
import { getNearestHospitals } from '../services/api';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';

const Hospitals = () => {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load request
  useEffect(() => {
    // Only fetch if we have no hospitals yet
    if (hospitals.length === 0) {
      handleFindHospitals();
    }
  }, []);

  const handleFindHospitals = () => {
    setLoading(true);
    setError(null);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await getNearestHospitals({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          if (response.success) {
            setHospitals(response.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError(err.message || 'Failed to fetch hospitals');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLocationError('Unable to retrieve your location. Please check permissions.');
        setLoading(false);
      }
    );
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.formatted_address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="bg-emerald-600 py-12 sm:py-20 text-center text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Nearby Medical Care</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Locate trusted hospitals, clinics, and emergency centers near you instantly.
          </p>
        </div>
      </div>

      <Section className="bg-gray-50 -mt-8 pt-0">
        <div className="flex flex-col gap-8">
          {/* Controls */}
          <Card className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 sm:p-6 sticky top-24 z-10 shadow-lg">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hospital name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button onClick={handleFindHospitals} disabled={loading} variant="secondary" className="w-full md:w-auto">
              <Navigation className="w-5 h-5 mr-2" />
              Use My Location
            </Button>
          </Card>

          {/* Error States */}
          {locationError && <Alert type="warning" title="Location Error" message={locationError} />}
          {error && <Alert type="error" title="Fetch Error" message={error} />}

          {/* Loading */}
          {loading && (
            <div className="py-20">
              <Loader message="Locating nearby facilities..." />
            </div>
          )}

          {/* Results */}
          {!loading && hospitals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital, idx) => (
                <Card key={idx} className="flex flex-col h-full hover:border-emerald-200 border-l-4 border-l-transparent hover:border-l-emerald-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    {hospital.rating && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        ⭐ {hospital.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{hospital.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{hospital.formatted_address}</p>

                  <div className="space-y-3 mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center text-sm text-gray-600">
                      <Navigation className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Distance unavailable</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.name + ' ' + hospital.formatted_address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Map className="w-4 h-4 mr-2" /> Directions
                      </a>
                      <a
                        href={`tel:${hospital.formatted_phone_number}`}
                        className="flex items-center justify-center px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" /> Call
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && hospitals.length === 0 && !error && !locationError && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No hospitals found yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Click "Use My Location" to find healthcare facilities near you.
              </p>
              <Button onClick={handleFindHospitals} variant="secondary">Locate Now</Button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default Hospitals;
