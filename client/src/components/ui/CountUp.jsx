import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const CountUp = ({ to, duration = 2, className = '' }) => {
    const [hasStarted, setHasStarted] = useState(false);

    // Create a spring value
    const springValue = useSpring(0, {
        duration: duration * 1000,
        bounce: 0
    });

    // Transform to integer string
    const displayValue = useTransform(springValue, (latest) =>
        Math.floor(latest).toLocaleString()
    );

    return (
        <motion.span
            className={className}
            onViewportEnter={() => {
                if (!hasStarted) {
                    springValue.set(to);
                    setHasStarted(true);
                }
            }}
        >
            {displayValue}
        </motion.span>
    );
};

export default CountUp;
