import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Stethoscope,
  Lightbulb,
  HelpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import Disclaimer from '../ui/Disclaimer';
import VoiceOutputButton from '../ui/VoiceOutputButton';

const AnalysisResult = ({ data, onFollowUp, isUpdating }) => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({
    causes: true,
    advice: true,
    followUp: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Determine severity level
  const getSeverityBadge = () => {
    if (data.emergency) {
      return { color: 'bg-red-100 text-red-800 border-red-200', label: t('symptoms.analysis.emergency') };
    }
    if (data.see_doctor) {
      return { color: 'bg-amber-100 text-amber-800 border-amber-200', label: t('symptoms.analysis.see_doctor') };
    }
    return { color: 'bg-green-100 text-green-800 border-green-200', label: t('symptoms.analysis.low_concern') };
  };

  const severity = getSeverityBadge();

  const Section = ({ title, icon: Icon, isOpen, onToggle, children }) => (
    <Card className="overflow-hidden" padding="none" hover={false} animate={false}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-[#2B6CB0]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header with Severity Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{t('symptoms.analysis.title')}</h2>
        <div className="flex items-center gap-3">
          <VoiceOutputButton
            text={`${t('symptoms.analysis.title')}. ${data.care_advice || ''}. ${data.possible_causes ? data.possible_causes.join('. ') : ''}`}
          />
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${severity.color}`}>
            {severity.label}
          </span>
        </div>
      </div>

      {/* Doctor Recommendation Alert */}
      {data.see_doctor && !data.emergency && (
        <Alert variant="warning" title={t('symptoms.analysis.doctor_recommended')}>
          {t('symptoms.analysis.doctor_recommended_desc')}
        </Alert>
      )}

      {/* Possible Causes Section */}
      <Section
        title={t('symptoms.analysis.possible_causes')}
        icon={Stethoscope}
        isOpen={expandedSections.causes}
        onToggle={() => toggleSection('causes')}
      >
        {data.possible_causes && data.possible_causes.length > 0 ? (
          <ul className="space-y-3">
            {data.possible_causes.map((cause, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-[#2B6CB0] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{cause}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">{t('symptoms.analysis.no_causes')}</p>
        )}
      </Section>

      {/* Care Advice Section */}
      <Section
        title={t('symptoms.analysis.care_advice')}
        icon={Lightbulb}
        isOpen={expandedSections.advice}
        onToggle={() => toggleSection('advice')}
      >
        {data.care_advice ? (
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="leading-relaxed whitespace-pre-line">{data.care_advice}</p>
          </div>
        ) : (
          <p className="text-gray-500">{t('symptoms.analysis.no_advice')}</p>
        )}
      </Section>

      {/* Follow-up Questions Section */}
      {data.follow_up_questions && data.follow_up_questions.length > 0 && (
        <Section
          title={t('symptoms.analysis.refine')}
          icon={HelpCircle}
          isOpen={expandedSections.followUp}
          onToggle={() => toggleSection('followUp')}
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              {t('symptoms.analysis.refine_desc')}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const answers = {};
                data.follow_up_questions.forEach((q, i) => {
                  answers[q] = formData.get(`question_${i}`);
                });
                // Convert to string format for AI
                const answerText = Object.entries(answers)
                  .map(([q, a]) => `Q: ${q}\nA: ${a}`)
                  .join('\n\n');

                if (onFollowUp) onFollowUp(answerText);
              }}
              className="space-y-4"
            >
              {data.follow_up_questions.map((question, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-gray-700 font-medium mb-2">
                    {question}
                  </label>
                  <textarea
                    name={`question_${index}`}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent outline-none transition-all"
                    rows="2"
                    placeholder="Your answer..."
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2 bg-[#2B6CB0] text-white rounded-lg font-semibold hover:bg-[#2C5282] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUpdating ? t('symptoms.analysis.updating') : t('symptoms.analysis.update_btn')}
                  {!isUpdating && <ChevronDown className="w-4 h-4 rotate-[-90deg]" />}
                </button>
              </div>
            </form>
          </div>
        </Section>
      )}

      {/* Doctor Visit Indicator */}
      <Card className="!bg-gray-50" hover={false} animate={false}>
        <div className="flex items-center gap-4">
          {data.see_doctor ? (
            <>
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t('symptoms.analysis.doctor_recommended')}</h4>
                <p className="text-gray-600 text-sm">
                  {t('symptoms.analysis.doctor_recommended_desc')}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t('symptoms.analysis.monitor_home')}</h4>
                <p className="text-gray-600 text-sm">
                  {t('symptoms.analysis.monitor_home_desc')}
                </p>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Disclaimer */}
      <Disclaimer />
    </motion.div>
  );
};

export default AnalysisResult;
