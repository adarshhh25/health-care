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
      return { color: 'bg-red-500/20 text-red-200 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]', label: t('symptoms.analysis.emergency') };
    }
    if (data.see_doctor) {
      return { color: 'bg-amber-500/20 text-amber-200 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]', label: t('symptoms.analysis.see_doctor') };
    }
    return { color: 'bg-green-500/20 text-green-200 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]', label: t('symptoms.analysis.low_concern') };
  };

  const severity = getSeverityBadge();

  const Section = ({ title, icon: Icon, isOpen, onToggle, children }) => (
    <Card className="overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg shadow-black/10" padding="none" hover={false} animate={false}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-6 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-inner">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
        <h2 className="text-2xl font-bold text-white">{t('symptoms.analysis.title')}</h2>
        <div className="flex items-center gap-3">
          <VoiceOutputButton
            text={`${t('symptoms.analysis.title')}. ${data.care_advice || ''}. ${data.possible_causes ? data.possible_causes.join('. ') : ''}`}
          />
          <motion.span
            animate={{ boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(255,255,255,0.1)", "0 0 0px rgba(0,0,0,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${severity.color}`}
          >
            {severity.label}
          </motion.span>
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
                className="flex items-start gap-3 group"
              >
                <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  {index + 1}
                </span>
                <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{cause}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">{t('symptoms.analysis.no_causes')}</p>
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
          <div className="prose prose-sm max-w-none text-gray-300">
            <p className="leading-relaxed whitespace-pre-line">{data.care_advice}</p>
          </div>
        ) : (
          <p className="text-gray-400">{t('symptoms.analysis.no_advice')}</p>
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
            <p className="text-gray-300">
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
                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <label className="block text-gray-200 font-medium mb-2">
                    {question}
                  </label>
                  <textarea
                    name={`question_${index}`}
                    className="w-full p-3 bg-white/5 text-white border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all placeholder-gray-500"
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
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
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
      <Card className="!bg-white/5 !border !border-white/10 backdrop-blur-md" hover={false} animate={false}>
        <div className="flex items-center gap-4">
          {data.see_doctor ? (
            <>
              <div className="p-3 bg-amber-500/20 rounded-full border border-amber-500/30">
                <AlertCircle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">{t('symptoms.analysis.doctor_recommended')}</h4>
                <p className="text-gray-300 text-sm">
                  {t('symptoms.analysis.doctor_recommended_desc')}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-green-500/20 rounded-full border border-green-500/30">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white">{t('symptoms.analysis.monitor_home')}</h4>
                <p className="text-gray-300 text-sm">
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
