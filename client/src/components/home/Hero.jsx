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
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Section from '../ui/Section';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Section background="white" className="relative overflow-hidden pt-0 pb-20">

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="text-center w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2B6CB0] font-semibold text-sm mb-8 border border-blue-100"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2B6CB0]" />
          </span>
          AI-Powered Healthcare Screening
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]"
        >
          Accessible Healthcare{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B6CB0] to-[#48BB78]">
            for Rural Communities
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Get instant preliminary health screening powered by AI.
          Describe your symptoms, analyze images, and find nearby hospitals —
          all from your device.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/symptoms')}
            className="shadow-xl shadow-blue-200/50"
          >
            Check Your Symptoms
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/hospitals')}
          >
            Find Hospitals Near Me
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-100"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Hospitals Indexed' },
              { value: '24/7', label: 'AI Availability' },
              { value: 'Free', label: 'Always Free' },
              { value: '<30s', label: 'Analysis Time' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </Section>
  );
};

export default Hero;

