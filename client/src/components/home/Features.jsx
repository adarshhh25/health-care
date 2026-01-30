import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, MapPin, Camera, AlertCircle, ChevronRight } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: 'AI Symptom Checker',
      description: 'Describe your symptoms in natural language and receive instant AI-powered preliminary analysis with care recommendations.',
      path: '/symptoms',
      color: 'text-[#2B6CB0]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: MapPin,
      title: 'Hospital Finder',
      description: 'Locate the nearest hospitals and healthcare facilities based on your current location with distance and directions.',
      path: '/hospitals',
      color: 'text-[#48BB78]',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      icon: Camera,
      title: 'Image Analysis',
      description: 'Upload images of visible symptoms for AI-powered visual screening and get preliminary observations.',
      path: '/image-analysis',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Detection',
      description: 'Our AI automatically detects potential emergency conditions and provides urgent care guidance immediately.',
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
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
        >
          Core Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Powerful AI-driven tools designed to provide immediate health insights
          and connect you with care.
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
          <motion.div key={index} variants={item}>
            <Card className={`h-full flex flex-col group ${feature.borderColor} border-2`}>
              {/* Icon */}
              <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-5`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow mb-5">
                {feature.description}
              </p>

              {/* CTA */}
              <Button
                variant="ghost"
                className={`mt-auto px-0 justify-start ${feature.color} hover:bg-transparent group-hover:translate-x-1`}
                onClick={() => navigate(feature.path)}
              >
                Try Now <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Features;
