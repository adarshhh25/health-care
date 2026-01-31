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
      bg: 'bg-blue-900/20 border-blue-800',
      icon: Info,
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-100',
      textColor: 'text-blue-200'
    },
    success: {
      bg: 'bg-green-900/20 border-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      titleColor: 'text-green-100',
      textColor: 'text-green-200'
    },
    warning: {
      bg: 'bg-amber-900/20 border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      titleColor: 'text-amber-100',
      textColor: 'text-amber-200'
    },
    error: {
      bg: 'bg-red-900/20 border-red-800',
      icon: AlertCircle,
      iconColor: 'text-red-400',
      titleColor: 'text-red-100',
      textColor: 'text-red-200'
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
