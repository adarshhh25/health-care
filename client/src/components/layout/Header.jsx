import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Symptom Checker', href: '/symptoms' },
        { name: 'Hospital Finder', href: '/hospitals' },
        { name: 'Image Analysis', href: '/image-analysis' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                            <Heart className="w-6 h-6" fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
                                RuralHealth<span className="text-blue-600">AI</span>
                            </h1>
                            <p className="text-xs font-medium text-gray-500 hidden sm:block">Advanced Screening Platform</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isActive(item.href)
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="ml-4 pl-4 border-l border-gray-200">
                            <Button variant="primary" className="!py-2 !px-5 !text-sm !rounded-full">
                                Emergency: 108
                            </Button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col gap-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`py-3 px-4 rounded-xl text-base font-semibold ${isActive(item.href)
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="mt-2 pt-4 border-t border-gray-100">
                        <Button variant="danger" className="w-full !rounded-xl justify-center">
                            Call Emergency (108)
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
