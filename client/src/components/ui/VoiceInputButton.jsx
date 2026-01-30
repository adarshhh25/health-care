import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import useVoiceInput from '../../hooks/useVoiceInput';
import { useTranslation } from 'react-i18next';

const VoiceInputButton = ({ onResult, className = '' }) => {
    const { t } = useTranslation();
    const { isListening, startListening, stopListening, isSupported } = useVoiceInput(onResult);

    if (!isSupported) return null;

    return (
        <div className={`relative ${className}`}>
            {isListening && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    {t('common.listening', 'Listening...')}
                </span>
            )}
            <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`
          p-3 rounded-full transition-colors relative
          ${isListening
                        ? 'bg-red-50 text-red-600 border border-red-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }
        `}
                title={isListening ? "Stop listening" : "Start voice input"}
            >
                {isListening ? (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-red-400"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <Mic className="w-5 h-5 relative z-10" />
                    </>
                ) : (
                    <MicOff className="w-5 h-5" />
                )}
            </motion.button>
        </div>
    );
};

export default VoiceInputButton;
