import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useVoiceOutput = () => {
    const { i18n } = useTranslation();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if ('speechSynthesis' in window) {
            setIsSupported(true);
        }
    }, []);

    const getLangTag = (lang) => {
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'mr': 'mr-IN',
            'bn': 'bn-IN'
        };
        return langMap[lang] || 'en-US';
    };

    const speak = useCallback((text) => {
        if (!isSupported || !text) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = getLangTag(i18n.language);

        // Adjust rate for better clarity, especially for non-native speakers or elderly
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('Speech synthesis error:', e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [i18n.language, isSupported]);

    const cancel = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, [isSupported]);

    return {
        speak,
        cancel,
        isSpeaking,
        isSupported
    };
};

export default useVoiceOutput;
