import { motion } from 'framer-motion';
import { MessageSquare, Brain, Stethoscope, MapPin } from 'lucide-react';
import Section from '../ui/Section';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Describe Symptoms',
      description: 'Tell us about your symptoms in your own words. Include details like duration and severity.'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our AI processes your information and provides preliminary health insights within seconds.'
    },
    {
      icon: Stethoscope,
      title: 'Get Recommendations',
      description: 'Receive care advice, possible causes, and whether you should see a doctor.'
    },
    {
      icon: MapPin,
      title: 'Find Care',
      description: 'Locate nearby hospitals and healthcare facilities if professional care is needed.'
    }
  ];

  return (
    <Section background="white">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Get health insights in four simple steps — no appointments needed.
        </motion.p>
      </div>

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-[#2B6CB0] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50"
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#48BB78] text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
