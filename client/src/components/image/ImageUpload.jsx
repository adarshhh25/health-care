import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';

const ImageUpload = ({ onSubmit, loading }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleFile = useCallback((file) => {
    setError('');

    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(t('image_analysis.upload.errors.invalid_type'));
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(t('image_analysis.upload.errors.file_size'));
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [t]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError(t('image_analysis.upload.errors.no_file'));
      return;
    }
    onSubmit({ file: selectedFile, description });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Upload Zone */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          {t('image_analysis.upload.label')} <span className="text-red-400">*</span>
        </label>

        {!preview ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
              transition-all duration-200
              ${dragActive
                ? 'border-purple-400 bg-purple-500/10'
                : 'border-white/20 hover:border-purple-400/50 hover:bg-white/5'
              }
            `}
          >
            <motion.div
              animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-purple-400' : 'text-gray-400'}`} />
              <p className="text-gray-200 font-medium mb-2">
                {dragActive ? t('image_analysis.upload.drop_here') : t('image_analysis.upload.drag_drop')}
              </p>
              <p className="text-sm text-gray-400">
                {t('image_analysis.upload.formats')}
              </p>
            </motion.div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-96 object-contain rounded-2xl border-2 border-gray-200 bg-gray-50"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              aria-label="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
            {selectedFile && (
              <p className="text-sm text-gray-600 mt-3">
                📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Description */}
      <Textarea
        label={t('image_analysis.upload.desc_label')}
        placeholder={t('image_analysis.upload.desc_placeholder')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={loading}
        disabled={!selectedFile}
        icon={ImageIcon}
      >
        {t('image_analysis.upload.analyze_btn')}
      </Button>

      {/* Privacy Notice */}
      <p className="text-sm text-gray-500 text-center">
        {t('image_analysis.upload.privacy')}
      </p>
    </motion.form>
  );
};

export default ImageUpload;
