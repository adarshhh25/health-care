/**
 * Animated Section Component
 * Wraps content with fade-in and slide-up animations
 */

import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  delay = 0, 
  className = '',
  duration = 0.5,
  type = 'fadeUp' // fadeUp, fadeIn, scale, slideLeft
}) => {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[type]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
