import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, Eye, Lightbulb, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Disclaimer from '../ui/Disclaimer';

const ImageAnalysisResult = ({ data, image }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('image_analysis.result.title')}</h2>
      </div>

      {/* Medical Attention Alert */}
      {data.medical_attention_recommended && (
        <Card className="!bg-amber-50 !border-2 !border-amber-200" hover={false} animate={false}>
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="p-2 bg-amber-100 rounded-xl"
            >
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-2">
                ⚠️ {t('image_analysis.result.medical_attention')}
              </h3>
              <p className="text-amber-800 text-sm mb-4">
                {t('image_analysis.result.medical_attention_desc')}
              </p>
              <Button
                variant="secondary"
                size="sm"
                icon={MapPin}
                onClick={() => navigate('/hospitals')}
              >
                {t('image_analysis.result.find_hospital')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Image Preview */}
      {image && (
        <Card hover={false} animate={false}>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            {t('image_analysis.result.analyzed_image')}
          </h3>
          <img
            src={image}
            alt="Analyzed"
            className="w-full max-h-64 object-contain rounded-xl bg-gray-50"
          />
        </Card>
      )}

      {/* Description / Observations */}
      <Card hover={false} animate={false}>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#2B6CB0]" />
          {t('image_analysis.result.observations')}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {data.description || t('image_analysis.result.no_observations')}
        </p>
      </Card>

      {/* Concerns */}
      {data.concerns && data.concerns.length > 0 && (
        <Card hover={false} animate={false}>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            {t('image_analysis.result.concerns')}
          </h3>
          <ul className="space-y-3">
            {data.concerns.map((concern, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-2 h-2 bg-purple-600 rounded-full mt-2" />
                <span className="text-gray-700">{concern}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      )}

      {/* Advice */}
      {data.advice && (
        <Card hover={false} animate={false}>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#48BB78]" />
            {t('image_analysis.result.advice')}
          </h3>
          <p className="text-gray-700 leading-relaxed">{data.advice}</p>
        </Card>
      )}

      {/* Image Info */}
      {data.image_info && (
        <Card className="!bg-gray-50" hover={false} animate={false}>
          <h3 className="text-sm font-bold text-gray-700 mb-3">{t('image_analysis.result.image_info')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">{t('image_analysis.result.filename')}</p>
              <p className="text-gray-700 font-medium truncate">{data.image_info.filename}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('image_analysis.result.size')}</p>
              <p className="text-gray-700 font-medium">
                {(data.image_info.size_bytes / 1024).toFixed(1)} KB
              </p>
            </div>
            <div>
              <p className="text-gray-500">{t('image_analysis.result.type')}</p>
              <p className="text-gray-700 font-medium">{data.image_info.mime_type}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <Disclaimer />
    </motion.div>
  );
};

export default ImageAnalysisResult;
