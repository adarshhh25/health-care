/**
 * Reusable Card Component with hover animations
 */

import { motion } from 'framer-motion';

const Card = ({ children, className = '', noPadding = false, hover = true, onClick }) => {
  const paddingClass = noPadding ? '' : 'p-6 sm:p-8';

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-md border border-gray-100/50 overflow-hidden ${paddingClass} ${className}`}
      whileHover={hover ? {
        y: -4,
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)'
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
