/**
 * Emergency Banner Component with pulse animation
 */

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const EmergencyBanner = ({ message, onClose }) => {
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-3 shadow-lg z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <p className="font-bold text-lg">🚨 EMERGENCY DETECTED</p>
            <p className="text-sm">{message || 'Please seek immediate medical attention or call emergency services!'}</p>
          </div>
        </div>
        {onClose && (
          <motion.button
            onClick={onClose}
            className="text-white hover:text-red-200 text-2xl leading-none"
            aria-label="Close emergency banner"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmergencyBanner;
