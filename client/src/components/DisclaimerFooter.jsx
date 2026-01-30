/**
 * Disclaimer Footer Component
 * Medical disclaimer displayed across all pages
 */

import { AlertTriangle } from 'lucide-react';

const DisclaimerFooter = () => {
  return (
    <footer className="bg-amber-50 border-t-2 border-amber-200 py-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900 mb-2">Important Medical Disclaimer</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              This AI tool does not replace professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any 
              questions you may have regarding a medical condition. Never disregard professional 
              medical advice or delay in seeking it because of something you have read from this tool. 
              If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DisclaimerFooter;
