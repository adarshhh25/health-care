import { motion } from "framer-motion";

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative w-16 h-16">
                <motion.span
                    className="block w-16 h-16 border-4 border-gray-200 rounded-full"
                />
                <motion.span
                    className="absolute top-0 left-0 block w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <p className="text-gray-500 font-medium animate-pulse">{message}</p>
        </div>
    );
};

export default Loader;
