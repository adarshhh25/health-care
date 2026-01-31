// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, Menu, X, Phone } from 'lucide-react';
// import Button from '../ui/Button';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location]);

//   // Prevent scroll when mobile menu is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isMenuOpen]);

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Symptom Checker', href: '/symptoms' },
//     { name: 'Hospital Finder', href: '/hospitals' },
//     { name: 'Image Analysis', href: '/image-analysis' },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//       className={`
//         sticky top-0 left-0 right-0 z-50 transition-all duration-300
//         ${scrolled
//           ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
//           : 'bg-white/80 backdrop-blur-sm'
//         }
//       `}
//     >
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 sm:h-20">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
//           >
//             <motion.div
//               className="bg-[#2B6CB0] p-2 rounded-xl text-white shadow-lg shadow-blue-200/50"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Heart className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
//             </motion.div>
//             <div>
//               <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight leading-none">
//                 RuralHealth<span className="text-[#2B6CB0]">AI</span>
//               </h1>
//               <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 hidden sm:block">
//                 Healthcare Screening
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-1">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`
//                   px-4 py-2 rounded-lg text-sm font-semibold transition-all
//                   ${isActive(item.href)
//                     ? 'bg-blue-50 text-[#2B6CB0]'
//                     : 'text-gray-600 hover:text-[#2B6CB0] hover:bg-gray-50'
//                   }
//                 `}
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <div className="ml-4 pl-4 border-l border-gray-200">
//               <Button
//                 variant="danger"
//                 size="sm"
//                 icon={Phone}
//                 className="!rounded-full"
//               >
//                 Emergency: 108
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={isMenuOpen}
//           >
//             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
//           >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-2">
//               {navigation.map((item, index) => (
//                 <motion.div
//                   key={item.name}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <Link
//                     to={item.href}
//                     className={`
//                       block py-3 px-4 rounded-xl text-base font-semibold transition-colors
//                       ${isActive(item.href)
//                         ? 'bg-blue-50 text-[#2B6CB0]'
//                         : 'text-gray-700 hover:bg-gray-50'
//                       }
//                     `}
//                   >
//                     {item.name}
//                   </Link>
//                 </motion.div>
//               ))}

//               <div className="pt-4 border-t border-gray-100">
//                 <Button variant="danger" fullWidth icon={Phone}>
//                   Call Emergency (108)
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default Header;


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Phone, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.symptoms'), href: '/symptoms' },
    { name: t('nav.hospitals'), href: '/hospitals' },
    { name: t('nav.image_analysis'), href: '/image-analysis' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'bn', name: 'বাংলা' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#020617]/80 border-b border-white/10 shadow-lg shadow-black/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-blue-500 to-teal-400 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-6 h-6" fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              RuralHealth<span className="text-teal-400">AI</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${isActive(item.href)
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="relative group ml-2">
              <button className="p-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-1 transition-colors">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase">{i18n.language.split('-')[0]}</span>
              </button>

              <div className="absolute right-0 top-full mt-2 w-32 bg-[#0f172a] rounded-xl shadow-xl shadow-black/50 border border-white/10 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`
                      w-full text-left px-4 py-2 text-sm font-medium transition-colors
                      ${i18n.language === lang.code ? 'text-teal-400 bg-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    `}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="danger"
              size="sm"
              icon={Phone}
              className="ml-2"
            >
              {t('common.emergency_btn')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const currentIndex = languages.findIndex(l => l.code === i18n.language);
                const nextIndex = (currentIndex + 1) % languages.length;
                changeLanguage(languages[nextIndex].code);
              }}
              className="!px-2"
            >
              <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
            </Button>

            <button
              className="p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block py-3 px-4 rounded-lg text-sm font-semibold transition-colors
                  ${isActive(item.href)
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-[var(--color-border)] my-2 pt-2">
              <div className="grid grid-cols-2 gap-2 p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`
                      p-2 rounded-lg text-sm font-semibold text-center transition-colors
                      ${i18n.language === lang.code ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'}
                    `}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="danger"
              fullWidth
              icon={Phone}
              className="mt-3"
            >
              {t('common.call_emergency')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
