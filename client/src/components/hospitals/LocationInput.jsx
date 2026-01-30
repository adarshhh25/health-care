import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const LocationInput = ({ onSubmit, loading }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [limit, setLimit] = useState('5');
  const [gettingLocation, setGettingLocation] = useState(false);
  const [error, setError] = useState('');

  const limitOptions = [
    { value: '3', label: t('hospitals.form.options.limit_3') },
    { value: '5', label: t('hospitals.form.options.limit_5') },
    { value: '10', label: t('hospitals.form.options.limit_10') },
    { value: '15', label: t('hospitals.form.options.limit_15') },
    { value: '20', label: t('hospitals.form.options.limit_20') }
  ];

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError(t('hospitals.errors.geolocation_unsupported'));
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
        let errorMessage = t('hospitals.errors.location_error');
        if (err.code === 1) errorMessage = t('hospitals.errors.permission_denied');
        else if (err.code === 2) errorMessage = t('hospitals.errors.unavailable');
        else if (err.code === 3) errorMessage = t('hospitals.errors.timeout');

        setError(`${errorMessage} ${t('hospitals.errors.manual_input')}`);
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
      setError(t('hospitals.errors.invalid_coords'));
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        setError(t('hospitals.errors.invalid_range'));
        return;
      }
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
          {gettingLocation ? t('common.getting_location') : t('common.u_location')}
        </Button>
        <span className="text-gray-500 text-sm">{t('common.or_enter_manually')}</span>
      </div>

      {/* Coordinates Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('common.latitude')}
          type="number"
          step="any"
          placeholder={t('hospitals.placeholders.latitude')}
          value={location.latitude}
          onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
          icon={MapPin}
          required
        />
        <Input
          label={t('common.longitude')}
          type="number"
          step="any"
          placeholder={t('hospitals.placeholders.longitude')}
          value={location.longitude}
          onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
          icon={MapPin}
          required
        />
      </div>

      {/* Limit Selection */}
      <Select
        label={t('hospitals.form.limit')}
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
        {t('hospitals.form.find_btn')}
      </Button>
    </motion.form>
  );
};

export default LocationInput;
