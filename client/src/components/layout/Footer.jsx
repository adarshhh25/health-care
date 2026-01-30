import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Symptom Checker', href: '/symptoms' },
    { name: 'Hospital Finder', href: '/hospitals' },
    { name: 'Image Analysis', href: '/image-analysis' },
  ];

  const resources = [
    { name: 'Emergency: 108', href: 'tel:108' },
    { name: 'Health Helpline: 104', href: 'tel:104' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#2B6CB0] p-2 rounded-xl text-white">
                <Heart className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-gray-900">RuralHealthAI</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Empowering rural communities with accessible AI-driven healthcare screening.
              Bridging the gap between technology and medical care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-600 hover:text-[#2B6CB0] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`
                      text-sm transition-colors
                      ${link.name.includes('Emergency')
                        ? 'text-red-600 font-semibold hover:text-red-700'
                        : link.name.includes('Helpline')
                          ? 'text-[#2B6CB0] font-semibold hover:text-blue-700'
                          : 'text-gray-600 hover:text-[#2B6CB0]'
                      }
                    `}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href="mailto:support@ruralhealthai.com" className="hover:text-[#2B6CB0]">
                  support@ruralhealthai.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href="tel:104" className="hover:text-[#2B6CB0]">
                  104 (Health Helpline)
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span>Serving Rural India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
