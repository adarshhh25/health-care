import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'default',
  animate = true 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10'
  };

  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5 },
    whileHover: hover ? { y: -4 } : {}
  } : {};

  return (
    <Component
      className={`
        bg-white rounded-2xl border border-gray-100 
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-xl hover:border-blue-100' : 'shadow-sm'} 
        transition-all duration-300 
        ${className}
      `}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Card;
