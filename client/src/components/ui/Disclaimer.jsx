import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = ({ className = '', variant = 'default' }) => {
  const { t } = useTranslation();
  const variants = {
    default: 'bg-amber-900/20 border-amber-800 text-amber-100',
    subtle: 'bg-gray-800/50 border-gray-700 text-gray-300',
    prominent: 'bg-blue-900/20 border-blue-800 text-blue-100'
  };

  return (
    <div className={`
      ${variants[variant]} 
      border-2 rounded-xl p-4 
      ${className}
    `}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold mb-1">{t('common.disclaimer.title')}</p>
          <p>
            {t('common.disclaimer.desc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
