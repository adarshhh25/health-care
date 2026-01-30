import { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, FileText, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeImage } from '../services/api';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import Alert from '../components/ui/Alert';

const ImageAnalysis = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) return setError('Only JPEG, PNG and WebP images are supported.');
    if (file.size > 10 * 1024 * 1024) return setError('File size must be less than 10MB.');

    setError(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeImage(selectedFile, description);
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-purple-600 py-12 sm:py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-600 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-6 inline-block">
            <Camera className="w-8 h-8 text-purple-100" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Visual Symptom Analysis</h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Upload a clear photo of your skin condition or visible symptom for an AI-based assessment.
          </p>
        </div>
      </div>

      <Section className="bg-gray-50 -mt-8 pt-0">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Upload Column */}
          <div className="space-y-6">
            <Card className="border-t-4 border-t-purple-500">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Image</h2>

              {!preview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-200 bg-purple-50/50 hover:bg-purple-50 rounded-2xl p-12 text-center cursor-pointer transition-colors group"
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Click to upload</p>
                  <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center group">
                  <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={handleRemove} className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md text-white transition-all">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileSelect} />

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details (Optional)</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  placeholder="Describe pain, itchiness, or duration..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {error && <div className="mt-4"><Alert type="error" message={error} /></div>}

              <Button
                className="w-full mt-6 !py-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                disabled={!selectedFile || loading}
                onClick={handleAnalyze}
              >
                {loading ? 'Processing Image...' : 'Analyze Image'}
              </Button>
            </Card>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">Privacy Notice</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Images are processed in real-time and briefly analyzed by our AI. We do not store your personal photos permanently.
                </p>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Card className="h-64 flex flex-col items-center justify-center">
                    <Loader message="Analyzing visual patterns..." />
                  </Card>
                </motion.div>
              )}

              {!loading && !result && (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl border-2 border-dashed border-gray-200 opacity-60">
                  <FileText className="w-16 h-16 mb-4 text-gray-300" />
                  <h3 className="text-lg font-bold text-gray-400">No Assessment Yet</h3>
                  <p className="text-gray-400">Upload an image to see results here</p>
                </div>
              )}

              {result && !loading && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  {/* Medical Alert */}
                  {result.medical_attention_recommended && (
                    <div className="bg-red-600 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row items-center gap-6">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-1">Attention Required</h3>
                        <p className="text-red-100">Our analysis suggests you should consult a doctor.</p>
                      </div>
                    </div>
                  )}

                  <Card className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Analysis Report</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Observations</h4>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                          {result.description}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                          <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Advice
                          </h4>
                          <p className="text-sm text-green-900">{result.advice}</p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                          <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> Concerns
                          </h4>
                          <ul className="text-sm text-purple-900 list-disc list-inside">
                            {result.concerns?.map((c, i) => <li key={i}>{c}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="text-xs text-gray-400 text-center">
                    AI Assessment ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} • {new Date().toLocaleDateString()}
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

export default ImageAnalysis;
