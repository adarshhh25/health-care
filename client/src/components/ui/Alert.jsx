import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Alert = ({ type = 'info', title, message, onClose }) => {
    const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-amber-50 border-amber-200 text-amber-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    };

    const icons = {
        info: Info,
        success: CheckCircle,
        warning: AlertCircle,
        error: AlertCircle,
    };

    const Icon = icons[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`border rounded-xl p-4 flex items-start gap-4 ${styles[type]}`}
        >
            <div className="flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
                {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
                <p className="text-sm leading-relaxed">{message}</p>
            </div>
        </motion.div>
    );
};

export default Alert;
