// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { ChevronRight } from 'lucide-react';
// import Button from '../ui/Button';

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     // <section className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
//     <section className="relative w-full overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36 pb-20">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent opacity-80" />
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="text-center max-w-4xl mx-auto">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2B6CB0] font-semibold text-sm mb-8 border border-blue-100"
//           >
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B6CB0]" />
//             </span>
//             AI-Powered Healthcare Screening
//           </motion.div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]"
//           >
//             Accessible Healthcare{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B6CB0] to-[#48BB78]">
//               for Rural Communities
//             </span>
//           </motion.h1>

//           {/* Subheading */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
//           >
//             Get instant preliminary health screening powered by AI.
//             Describe your symptoms, analyze images, and find nearby hospitals —
//             all from your device.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Button
//               size="lg"
//               onClick={() => navigate('/symptoms')}
//               className="shadow-xl shadow-blue-200/50"
//             >
//               Check Your Symptoms
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//             <Button
//               variant="outline"
//               size="lg"
//               onClick={() => navigate('/hospitals')}
//             >
//               Find Hospitals Near Me
//             </Button>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="mt-16 pt-8 border-t border-gray-100"
//           >
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
//               {[
//                 { value: '10,000+', label: 'Hospitals Indexed' },
//                 { value: '24/7', label: 'AI Availability' },
//                 { value: 'Free', label: 'Always Free' },
//                 { value: '<30s', label: 'Analysis Time' },
//               ].map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
//                   <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Globe, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Section from '../ui/Section';
import NeuralBackground from '../ui/NeuralBackground';
import CountUp from '../ui/CountUp';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Section className="relative overflow-hidden pt-6 sm:pt-16 lg:pt-4 pb-20 !bg-transparent">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 opacity-20 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 opacity-10 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      {/* Neural Background Animation */}
      <NeuralBackground />

      {/* Content */}
      <div className="text-center w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold text-sm mb-8 border border-[var(--color-primary)]/20 shadow-lg shadow-blue-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]" />
          </span>
          {t('hero.badge')}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-white">
            {t('hero.title_start')}
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] filter drop-shadow-sm">
            {t('hero.title_highlight')}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            onClick={() => navigate('/symptoms')}
            className="shadow-xl shadow-blue-500/20"
          >
            {t('hero.cta_check_symptoms')}
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/hospitals')}
          >
            {t('hero.cta_find_hospitals')}
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-16"
        >
          {[
            { icon: Shield, text: "HIPAA Compliant" },
            { icon: Globe, text: "Rural Optimized" },
            { icon: Award, text: "98% Accuracy" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-400">
              <item.icon className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 border-t border-[var(--color-border)]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1"><CountUp to={10000} />+</p>
              <p className="text-sm text-gray-400">{t('hero.stats.hospitals')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">24/7</p>
              <p className="text-sm text-gray-400">{t('hero.stats.available')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{t('hero.stats.val_free')}</p>
              <p className="text-sm text-gray-400">{t('hero.stats.lbl_free')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">&lt;<CountUp to={30} />s</p>
              <p className="text-sm text-gray-400">{t('hero.stats.analysis_time')}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </Section>
  );
};

export default Hero;

