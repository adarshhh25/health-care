import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useVoiceInput = (onResult) => {
    const { i18n } = useTranslation();
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState('');
    const [recognition, setRecognition] = useState(null);

    // Map app languages to BCP 47 tags
    const getLangTag = (lang) => {
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'mr': 'mr-IN',
            'bn': 'bn-IN'
        };
        return langMap[lang] || 'en-US';
    };

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = true;

            recognitionInstance.onstart = () => {
                setIsListening(true);
                setError('');
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setError(event.error);
                setIsListening(false);
            };

            recognitionInstance.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                if (event.results[0].isFinal && onResult) {
                    onResult(transcript);
                }
            };

            setRecognition(recognitionInstance);
        } else {
            setError('Browser not supported');
        }
    }, [onResult]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.lang = getLangTag(i18n.language);
                recognition.start();
            } catch (err) {
                console.error('Failed to start recognition:', err);
            }
        } else {
            setError('Voice input not supported in this browser');
        }
    }, [recognition, i18n.language]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return {
        isListening,
        startListening,
        stopListening,
        error,
        isSupported: !!recognition
    };
};

export default useVoiceInput;
