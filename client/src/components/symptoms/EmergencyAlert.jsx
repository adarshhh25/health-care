import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Phone, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const EmergencyAlert = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.5)] p-6 sm:p-8 relative overflow-hidden backdrop-blur-md border border-red-500/30">
            {/* Background pulse effect */}
            <div className="absolute inset-0 bg-red-500/20 animate-pulse" />

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
                  className="bg-white/10 p-2 rounded-full backdrop-blur-sm"
                >
                  <AlertCircle className="w-10 h-10" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">⚠️ {t('symptoms.emergency.title')}</h3>
                  <p className="text-red-100 font-medium">{t('symptoms.emergency.subtitle')}</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-white mb-6 leading-relaxed text-lg">
                {t('symptoms.emergency.message')}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="!bg-white !text-red-700 hover:!bg-red-50 !border-white font-bold shadow-lg"
                  icon={Phone}
                  onClick={() => window.location.href = 'tel:108'}
                >
                  {t('symptoms.emergency.call_btn')}
                </Button>
                <Button
                  variant="outline"
                  className="!border-white/50 !text-white hover:!bg-white/10"
                  icon={MapPin}
                  onClick={() => navigate('/hospitals')}
                >
                  {t('symptoms.emergency.find_hospital')}
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
