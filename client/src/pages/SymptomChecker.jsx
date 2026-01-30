import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import SymptomForm from '../components/symptoms/SymptomForm';
import AnalysisResult from '../components/symptoms/AnalysisResult';
import EmergencyAlert from '../components/symptoms/EmergencyAlert';
import { analyzeSymptoms } from '../services/api';

const SymptomChecker = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [currentSymptoms, setCurrentSymptoms] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setResult(null);
    setShowEmergency(false);

    try {
      // Format symptoms text with context
      const symptomsText = `
        Patient Information:
        - Age: ${formData.age} years
        - Gender: ${formData.gender || 'Not specified'}
        - Duration: ${formData.duration || 'Not specified'}
        
        Symptoms:
        ${formData.symptoms}
      `.trim();

      setCurrentSymptoms(symptomsText);

      const response = await analyzeSymptoms({
        symptoms: symptomsText,
        language: i18n.language
      });

      const analysisData = response.data || response;
      setResult(analysisData);

      if (analysisData.emergency) {
        setShowEmergency(true);
        toast.error('Emergency symptoms detected! Please seek immediate medical care.');
      } else if (analysisData.see_doctor) {
        toast.warning('We recommend consulting a healthcare provider.');
      } else {
        toast.success('Analysis complete!');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setShowEmergency(false);
    setCurrentSymptoms('');
  };

  const handleFollowUp = async (answers) => {
    setLoading(true);
    try {
      const response = await import('../services/api').then(m => m.submitFollowUp({
        original_symptoms: currentSymptoms,
        follow_up_answers: answers,
        language: i18n.language
      }));

      const analysisData = response.data || response;
      setResult(analysisData);
      toast.success('Analysis updated with new information!');
    } catch (error) {
      console.error('Follow-up error:', error);
      toast.error('Failed to update analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Emergency Alert */}
      {showEmergency && (
        <EmergencyAlert onClose={() => setShowEmergency(false)} />
      )}

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
              <Activity className="w-8 h-8 text-[#2B6CB0]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t('symptoms.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              {t('symptoms.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Card>
              <Loader message={t('symptoms.loading')} size="default" />
            </Card>
          ) : result ? (
            <div className="space-y-6">
              <AnalysisResult data={result} onFollowUp={handleFollowUp} isUpdating={loading} />

              <div className="text-center">
                <button
                  onClick={handleNewAnalysis}
                  className="text-[#2B6CB0] font-semibold hover:underline"
                >
                  ← {t('symptoms.new_analysis')}
                </button>
              </div>
            </div>
          ) : (
            <Card>
              <SymptomForm onSubmit={handleSubmit} loading={loading} />
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default SymptomChecker;
