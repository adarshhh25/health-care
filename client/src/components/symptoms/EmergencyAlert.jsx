import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Phone, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const EmergencyAlert = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'spring', damping: 15 }}
        className="fixed inset-x-0 top-16 sm:top-20 z-40 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-600 text-white rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Background pulse effect */}
            <div className="absolute inset-0 bg-red-500 animate-pulse opacity-30" />
            
            <div className="relative z-10">
              {/* Close button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close alert"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <AlertCircle className="w-10 h-10" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">⚠️ Emergency Detected</h3>
                  <p className="text-red-100">Seek Immediate Medical Attention</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-red-100 mb-6 leading-relaxed">
                Based on your symptoms, this may require urgent medical care. 
                Please contact emergency services or visit the nearest hospital immediately.
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="!bg-white !text-red-600 hover:!bg-red-50 !border-white"
                  icon={Phone}
                  onClick={() => window.location.href = 'tel:108'}
                >
                  Call 108 (Ambulance)
                </Button>
                <Button
                  variant="outline"
                  className="!border-white/50 !text-white hover:!bg-white/10"
                  icon={MapPin}
                  onClick={() => navigate('/hospitals')}
                >
                  Find Nearest Hospital
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyAlert;
