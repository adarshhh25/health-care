import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import ImageUpload from '../components/image/ImageUpload';
import ImageAnalysisResult from '../components/image/ImageAnalysisResult';
import { analyzeImage } from '../services/api';

const ImageAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzedImage, setAnalyzedImage] = useState(null);

  const handleSubmit = async ({ file, description }) => {
    setLoading(true);
    setResult(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      if (description) {
        formData.append('description', description);
      }

      // Store image preview
      const reader = new FileReader();
      reader.onload = (e) => setAnalyzedImage(e.target.result);
      reader.readAsDataURL(file);

      const response = await analyzeImage(formData);
      setResult(response);

      if (response.medical_attention_recommended) {
        toast.warning('Analysis suggests you should consult a healthcare provider.');
      } else {
        toast.success('Image analysis complete!');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setAnalyzedImage(null);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-2xl mb-4">
              <Camera className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Image Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Upload an image of visible symptoms for AI-powered visual screening.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Card>
              <Loader message="Analyzing your image..." size="default" />
            </Card>
          ) : result ? (
            <div className="space-y-6">
              <ImageAnalysisResult data={result} image={analyzedImage} />
              
              <div className="text-center">
                <button
                  onClick={handleNewAnalysis}
                  className="text-purple-600 font-semibold hover:underline"
                >
                  ← Analyze Another Image
                </button>
              </div>
            </div>
          ) : (
            <Card>
              <ImageUpload onSubmit={handleSubmit} loading={loading} />
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default ImageAnalysis;
