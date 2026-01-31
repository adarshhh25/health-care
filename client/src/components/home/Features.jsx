import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, MapPin, Camera, AlertCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import Card from '../ui/Card';
import TiltCard from '../ui/TiltCard';
import Button from '../ui/Button';

const Features = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: Activity,
      title: t('features.symptom_checker.title'),
      description: t('features.symptom_checker.desc'),
      path: '/symptoms',
      color: 'text-[#2B6CB0]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: MapPin,
      title: t('features.hospital_locator.title'),
      description: t('features.hospital_locator.desc'),
      path: '/hospitals',
      color: 'text-[#48BB78]',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      icon: Camera,
      title: t('features.image_analysis.title'),
      description: t('features.image_analysis.desc'),
      path: '/image-analysis',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      icon: AlertCircle,
      title: t('features.emergency_support.title'),
      description: t('features.emergency_support.desc'),
      path: '/symptoms',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Section background="default">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {t('features.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          {t('features.subtitle')}
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item} className="h-full">
            <TiltCard className="h-full">
              <Card className={`h-full flex flex-col group relative overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]`}>

                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-tr ${feature.bgColor.replace('bg-', 'from-').replace('-50', '-500')} to-transparent`} />

                {/* Icon */}
                <div className={`w-14 h-14 ${feature.bgColor} bg-opacity-10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm border ${feature.borderColor} border-opacity-20`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed flex-grow mb-5 relative z-10">
                  {feature.description}
                </p>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className={`mt-auto px-0 justify-start ${feature.color} hover:bg-transparent group-hover:translate-x-1 relative z-10`}
                  onClick={() => navigate(feature.path)}
                >
                  Try Now <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Features;
