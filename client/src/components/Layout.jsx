import { motion } from 'framer-motion';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 w-full overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
            <Header />

            <main className="flex-grow w-full pt-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col"
                >
                    {children}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
