import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Loader = ({ message = 'Loading...', size = 'default' }) => {
  const sizes = {
    small: { container: 'py-8', icon: 'w-8 h-8', text: 'text-sm' },
    default: { container: 'py-16', icon: 'w-12 h-12', text: 'text-base' },
    large: { container: 'py-24', icon: 'w-16 h-16', text: 'text-lg' },
    fullscreen: { container: 'fixed inset-0 z-50 bg-white/90 backdrop-blur-sm', icon: 'w-16 h-16', text: 'text-lg' }
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center ${currentSize.container}`}>
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer ring */}
        <div className={`${currentSize.icon} rounded-full border-4 border-blue-100 border-t-[#2B6CB0] animate-spin`} />
        
        {/* Center heart */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className="w-5 h-5 text-[#2B6CB0]" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      <motion.p
        className={`mt-4 text-gray-600 font-medium ${currentSize.text}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;
