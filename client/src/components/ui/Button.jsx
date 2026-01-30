import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-semibold 
    rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `;

  const variants = {
    primary: `
      bg-[#2B6CB0] text-white hover:bg-[#2C5282] 
      focus-visible:ring-[#2B6CB0] shadow-lg shadow-blue-200/50
      hover:shadow-xl hover:shadow-blue-300/50
    `,
    secondary: `
      bg-[#48BB78] text-white hover:bg-[#38A169] 
      focus-visible:ring-[#48BB78] shadow-lg shadow-green-200/50
      hover:shadow-xl hover:shadow-green-300/50
    `,
    danger: `
      bg-[#E53E3E] text-white hover:bg-[#C53030] 
      focus-visible:ring-[#E53E3E] shadow-lg shadow-red-200/50
      hover:shadow-xl hover:shadow-red-300/50
    `,
    outline: `
      bg-transparent border-2 border-gray-300 text-gray-700 
      hover:border-[#2B6CB0] hover:text-[#2B6CB0] hover:bg-blue-50
      focus-visible:ring-[#2B6CB0]
    `,
    ghost: `
      bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900
      focus-visible:ring-gray-400
    `,
    emergency: `
      bg-[#E53E3E] text-white hover:bg-[#C53030] 
      focus-visible:ring-[#E53E3E] animate-pulse
      shadow-lg shadow-red-300/50
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
