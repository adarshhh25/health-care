import { useNavigate } from 'react-router-dom';
import { Activity, MapPin, Camera, ChevronRight, CheckCircle, Shield, Clock } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Home = () => {
  const navigate = useNavigate();

  const primaryFeatures = [
    {
      title: 'AI Symptom Checker',
      desc: 'Describe your symptoms in natural language for instant preliminary assessment.',
      icon: Activity,
      path: '/symptoms',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Hospital Finder',
      desc: 'Locate nearby hospitals and clinics based on your current geolocation.',
      icon: MapPin,
      path: '/hospitals',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Image Analysis',
      desc: 'Upload images of skin conditions for AI-powered visual screening.',
      icon: Camera,
      path: '/image-analysis',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const stats = [
    { label: 'Hospitals Indexed', value: '10,000+' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Accuracy Rate', value: '94%' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-10 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 right-0 -z-10 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-transparent opacity-70"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            AI-Powered Healthcare Screening V2.0
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
            Accessible Healthcare <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Powered by AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
            Bridging the gap between rural communities and quality healthcare.
            Instant symptom analysis, hospital location services, and visual screening tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button
              className="!py-4 !px-8 text-lg w-full sm:w-auto shadow-xl shadow-blue-200/50"
              onClick={() => navigate('/symptoms')}
            >
              Start Screening
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button
              variant="outline"
              className="!py-4 !px-8 text-lg w-full sm:w-auto"
              onClick={() => navigate('/hospitals')}
            >
              Find Nearby Care
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl border-t border-gray-100 pt-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <Section className="bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three powerful tools designed to provide immediate health insights and connect you with care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {primaryFeatures.map((feature, idx) => (
            <Card key={idx} className="h-full flex flex-col relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>

              <div className={`w-14 h-14 ${feature.bgColor} ${feature.textColor} rounded-2xl flex items-center justify-center mb-6 relative z-10`}>
                <feature.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                {feature.desc}
              </p>

              <Button
                variant="ghost"
                className="mt-auto px-0 justify-start hover:bg-transparent hover:translate-x-1 font-bold text-blue-600"
                onClick={() => navigate(feature.path)}
              >
                Try Now <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Trust Section */}
      <Section className="bg-white">
        <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="grid md:grid-cols-2 items-center p-8 sm:p-12 lg:p-16 gap-12 relative z-10">
            <div className="text-white space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Trust & Security First</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Your health data is sensitive. We ensure maximum privacy and do not store personally identifiable medical records without consent.
              </p>

              <ul className="space-y-4">
                {[
                  { icon: Shield, text: 'End-to-end Encryption' },
                  { icon: CheckCircle, text: 'No Medical Data Storage' },
                  { icon: Clock, text: 'Real-time Processing' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="p-1 rounded bg-blue-500/50">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              {/* Abstract Visual */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
                  <Shield className="w-10 h-10 text-white" />
                  <div>
                    <p className="text-sm text-blue-200">Security Status</p>
                    <p className="text-white font-bold text-lg">Active & Protected</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-white/20 rounded-full w-full"></div>
                  <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
