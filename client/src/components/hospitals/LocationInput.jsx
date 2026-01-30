import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const LocationInput = ({ onSubmit, loading }) => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [limit, setLimit] = useState('5');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState('');

  const limitOptions = [
    { value: '3', label: '3 hospitals' },
    { value: '5', label: '5 hospitals' },
    { value: '10', label: '10 hospitals' },
    { value: '15', label: '15 hospitals' },
    { value: '20', label: '20 hospitals' }
  ];

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation({
          latitude: lat.toString(),
          longitude: lon.toString()
        });
        setGettingLocation(false);

        // Auto-submit logic
        if (onSubmit) {
          onSubmit({
            latitude: lat,
            longitude: lon,
            limit: parseInt(limit)
          });
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        let errorMessage = 'Unable to get your location.';
        if (err.code === 1) errorMessage = 'Location permission denied.';
        else if (err.code === 2) errorMessage = 'Location unavailable.';
        else if (err.code === 3) errorMessage = 'Location request timed out.';

        setError(`${errorMessage} Please enter manually.`);
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lat = parseFloat(location.latitude);
    const lon = parseFloat(location.longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setError('Please enter valid coordinates');
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError('Please enter valid latitude (-90 to 90) and longitude (-180 to 180)');
      return;
    }

    setError('');
    onSubmit({ latitude: lat, longitude: lon, limit: parseInt(limit) });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Get Location Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          icon={Navigation}
          onClick={getUserLocation}
          loading={gettingLocation}
          className="w-full sm:w-auto"
        >
          {gettingLocation ? 'Getting Location...' : 'Use My Location'}
        </Button>
        <span className="text-gray-500 text-sm">or enter coordinates manually</span>
      </div>

      {/* Coordinates Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Latitude"
          type="number"
          step="any"
          placeholder="e.g., 28.7041"
          value={location.latitude}
          onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
          icon={MapPin}
          required
        />
        <Input
          label="Longitude"
          type="number"
          step="any"
          placeholder="e.g., 77.1025"
          value={location.longitude}
          onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
          icon={MapPin}
          required
        />
      </div>

      {/* Limit Selection */}
      <Select
        label="Number of hospitals to find"
        options={limitOptions}
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={loading}
        icon={Search}
      >
        Find Nearby Hospitals
      </Button>
    </motion.form>
  );
};

export default LocationInput;
