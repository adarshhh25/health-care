import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    icon: Icon
}) => {

    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg focus:ring-blue-500",
        secondary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg focus:ring-emerald-500",
        outline: "border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 bg-white focus:ring-gray-200",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-blue-600",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-500"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: disabled ? 0 : -1 }}
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </motion.button>
    );
};

export default Button;
