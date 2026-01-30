import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const Alert = ({ 
  variant = 'info', 
  title, 
  children, 
  onClose,
  className = '' 
}) => {
  const variants = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      textColor: 'text-blue-800'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      titleColor: 'text-green-900',
      textColor: 'text-green-800'
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      textColor: 'text-amber-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      titleColor: 'text-red-900',
      textColor: 'text-red-800'
    },
    emergency: {
      bg: 'bg-red-600 border-red-700',
      icon: AlertCircle,
      iconColor: 'text-white',
      titleColor: 'text-white',
      textColor: 'text-red-100'
    }
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        ${currentVariant.bg} 
        border-2 rounded-xl p-4 
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={variant === 'emergency' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: variant === 'emergency' ? Infinity : 0 }}
        >
          <IconComponent className={`w-6 h-6 flex-shrink-0 ${currentVariant.iconColor}`} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-bold ${currentVariant.titleColor} mb-1`}>
              {title}
            </h4>
          )}
          <div className={`text-sm ${currentVariant.textColor} leading-relaxed`}>
            {children}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`${currentVariant.iconColor} hover:opacity-70 transition-opacity`}
            aria-label="Close alert"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;
