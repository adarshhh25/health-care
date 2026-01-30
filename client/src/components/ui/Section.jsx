import { motion } from 'framer-motion';

const Section = ({ children, className = '', delay = 0 }) => {
    return (
        <section className={`py-12 sm:py-16 md:py-20 w-full ${className}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

export default Section;
