import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertCircle, ArrowLeft, CheckCircle, ChevronRight, RefreshCw, User } from 'lucide-react';
import { analyzeSymptoms } from '../services/api';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Alert from '../components/ui/Alert';
import Loader from '../components/ui/Loader';

const Symptoms = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Follow-up state
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [isRefinedAnalysis, setIsRefinedAnalysis] = useState(false);
  const [followUpAnswers, setFollowUpAnswers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.symptoms.trim()) return setError('Please describe your symptoms');

    setLoading(true);
    setError(null);
    setResult(null);
    setShowFollowUp(false);
    setIsRefinedAnalysis(false);

    try {
      const response = await analyzeSymptoms({
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        symptoms: formData.symptoms,
        duration: formData.duration || null,
      });

      if (response.success) {
        setResult(response.data);
        if (response.data.follow_up_questions?.length > 0) {
          setShowFollowUp(true);
          setFollowUpAnswers(response.data.follow_up_questions.map(q => ({ question: q, answer: '' })));
        }
      } else {
        setError(response.message || 'Analysis failed. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUpAnswerChange = (index, value) => {
    const newAnswers = [...followUpAnswers];
    newAnswers[index].answer = value;
    setFollowUpAnswers(newAnswers);
  };

  const handleFollowUpSubmit = async () => {
    setFollowUpLoading(true);
    setError(null);

    try {
      const enhancedSymptoms = `Original: ${formData.symptoms}\n\nFollow-Up:\n${followUpAnswers.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer || 'Skipped'}`).join('\n')}`;

      const response = await analyzeSymptoms({
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        symptoms: enhancedSymptoms,
        duration: formData.duration || null,
      });

      if (response.success) {
        setResult(response.data);
        setIsRefinedAnalysis(true);
        setShowFollowUp(false);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFollowUpLoading(false);
    }
  };

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'emergency': return 'bg-red-50 text-red-700 border-red-200';
      case 'severe': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'moderate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'mild': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header / Title */}
      <div className="bg-blue-600 py-12 sm:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Symptom Checker</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Advanced algorithms analyze your symptoms to provide instant health guidance.
          </p>
        </div>
      </div>

      <Section className="bg-gray-50 -mt-8 pt-0">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-5 xl:col-span-4">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Patient Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Age"
                    type="number"
                    name="age"
                    placeholder="e.g. 30"
                    value={formData.age}
                    onChange={handleChange}
                    className="col-span-1"
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe Symptoms <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="symptoms"
                    rows="5"
                    placeholder="I have a severe headache on the left side..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    value={formData.symptoms}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <Input
                  label="Duration (e.g. 2 days)"
                  name="duration"
                  placeholder="How long have you felt this way?"
                  value={formData.duration}
                  onChange={handleChange}
                />

                <Button type="submit" disabled={loading} className="w-full !py-4 shadow-lg shadow-blue-200/50">
                  {loading ? 'Analyzing...' : 'Analyze Symptoms'}
                  {!loading && <ChevronRight className="w-5 h-5 ml-1" />}
                </Button>
              </form>
            </Card>
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100"
                >
                  <Loader message="AI is analyzing your symptoms..." />
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Alert type="error" title="Analysis Error" message={error} />
                </motion.div>
              )}

              {!loading && !result && !error && (
                <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-12 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
                  <Activity className="w-16 h-16 mb-4 text-gray-200" />
                  <h3 className="text-lg font-semibold text-gray-500">Waiting for input</h3>
                  <p className="max-w-xs mx-auto mt-2">Fill out the form on the left to get your instant health assessment.</p>
                </div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {isRefinedAnalysis && (
                    <Alert type="success" title="Analysis Refined" message="Results updated based on your follow-up answers." />
                  )}

                  {/* Severity Card */}
                  <Card className={`border-l-8 ${getSeverityStyle(result.severity)}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider opacity-70 mb-1">Severity Assessment</p>
                        <h2 className="text-3xl font-bold capitalize">{result.severity}</h2>
                      </div>
                      {result.emergency && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold text-sm animate-pulse border border-red-200">
                          Medical Attention Required
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Doctor Recommendation */}
                  {result.doctor_visit_needed && (
                    <div className="bg-blue-600 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Consultation Recommended</h3>
                          <p className="text-blue-100 max-w-md">
                            Based on your symptoms, we strongly advise visiting a doctor.
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="whitespace-nowrap bg-white text-blue-600 hover:bg-blue-50 border-white" onClick={() => navigate('/hospitals')}>
                        Find Nearby Hospital
                      </Button>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" /> Possible Causes
                      </h3>
                      <ul className="space-y-3">
                        {result.possible_causes?.map((cause, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="font-medium text-gray-700">{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card>
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" /> Care Advice
                      </h3>
                      <div className="prose prose-sm prose-blue text-gray-600 leading-relaxed">
                        <p className="whitespace-pre-line">{result.care_advice}</p>
                      </div>
                    </Card>
                  </div>

                  {/* Follow Up Section */}
                  {showFollowUp && (
                    <Card className="border-2 border-blue-100 bg-blue-50/50">
                      <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <RefreshCw className="w-5 h-5" /> Refine Analysis
                      </h3>
                      <div className="space-y-4">
                        {followUpAnswers.map((item, idx) => (
                          <div key={idx}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{item.question}</label>
                            <Input
                              placeholder="Your answer..."
                              value={item.answer}
                              onChange={(e) => handleFollowUpAnswerChange(idx, e.target.value)}
                              className="bg-white"
                            />
                          </div>
                        ))}
                        <div className="flex justify-end pt-2">
                          <Button onClick={handleFollowUpSubmit} disabled={followUpLoading}>
                            {followUpLoading ? 'Updating Results...' : 'Update Analysis'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                    <strong>Disclaimer:</strong> {result.disclaimer}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Symptoms;
