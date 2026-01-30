import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const HospitalCard = ({ hospital, index }) => {
  const { name, address, distance_km, latitude, longitude, phone } = hospital;

  // Distance color coding
  const getDistanceColor = () => {
    if (distance_km < 5) return 'bg-green-100 text-green-800 border-green-200';
    if (distance_km < 10) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
              <MapPin className="w-7 h-7 text-[#48BB78]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                {name}
              </h3>
              
              {/* Distance Badge */}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border whitespace-nowrap ${getDistanceColor()}`}>
                {distance_km.toFixed(1)} km
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {address}
            </p>

            {/* Coordinates */}
            <p className="text-xs text-gray-400 mb-4">
              📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Navigation}
                onClick={openDirections}
                className="flex-1 sm:flex-none"
              >
                Get Directions
              </Button>
              
              {phone && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={Phone}
                  onClick={() => window.location.href = `tel:${phone}`}
                  className="flex-1 sm:flex-none"
                >
                  Call
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HospitalCard;
