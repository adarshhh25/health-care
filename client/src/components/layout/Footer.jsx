import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="w-6 h-6 text-blue-600" fill="currentColor" />
                            <span className="text-xl font-bold text-gray-900">RuralHealthAI</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                            Empowering rural communities with accessible AI-driven healthcare screening tools.
                            Bridging the gap between technology and medical care.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/symptoms" className="hover:text-blue-600">Symptom Checker</Link></li>
                            <li><Link to="/hospitals" className="hover:text-blue-600">Find Hospitals</Link></li>
                            <li><Link to="/image-analysis" className="hover:text-blue-600">Image Analysis</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Emergency</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><span className="font-semibold text-red-600">Ambulance: 108</span></li>
                            <li><span className="font-semibold text-blue-600">Helpline: 104</span></li>
                            <li>support@ruralhealthai.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 mt-8">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <p className="text-amber-800 text-sm text-center leading-relaxed font-medium">
                            ⚠️ Medical Disclaimer: This application is for screening and informational purposes only.
                            It does not provide diagnosis. Always consult a qualified healthcare provider for medical advice.
                        </p>
                    </div>

                    <p className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} Rural Healthcare AI Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
