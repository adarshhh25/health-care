import { Volume2, Square } from 'lucide-react';
import useVoiceOutput from '../../hooks/useVoiceOutput';
import Button from './Button';
import { useTranslation } from 'react-i18next';

const VoiceOutputButton = ({ text, className = '' }) => {
    const { t } = useTranslation();
    const { speak, cancel, isSpeaking, isSupported } = useVoiceOutput();

    if (!isSupported || !text) return null;

    return (
        <Button
            variant="secondary"
            size="sm"
            icon={isSpeaking ? Square : Volume2}
            onClick={() => isSpeaking ? cancel() : speak(text)}
            className={`${isSpeaking ? 'bg-amber-100 text-amber-800' : ''} ${className}`}
        >
            {isSpeaking ? t('common.stop_listening', 'Stop') : t('common.listen', 'Listen')}
        </Button>
    );
};

export default VoiceOutputButton;
