import { motion } from 'framer-motion';
import { MessageSquare, Brain, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: MessageSquare,
      title: t('how_it_works.step1.title'),
      description: t('how_it_works.step1.desc')
    },
    {
      icon: Brain,
      title: t('how_it_works.step2.title'),
      description: t('how_it_works.step2.desc')
    },
    {
      icon: Stethoscope,
      title: t('how_it_works.step3.title'),
      description: t('how_it_works.step3.desc')
    }
  ];

  return (
    <Section className="py-16 sm:py-24 !bg-transparent relative z-10">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {t('how_it_works.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          {t('how_it_works.subtitle')}
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              <TiltCard className="h-full">
                <div className="h-full p-6">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10 hover:bg-white/20 transition-colors"
                    >
                      <step.icon className="w-10 h-10 text-cyan-400" />
                    </motion.div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
