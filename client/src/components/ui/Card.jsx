import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
    return (
        <motion.div
            className={`bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 ${hover ? 'hover:shadow-xl hover:border-blue-100' : 'shadow-sm'} transition-all duration-300 ${className}`}
            whileHover={hover ? { y: -4 } : {}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
