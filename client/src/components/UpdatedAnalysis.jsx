/**
 * Updated Analysis Component
 * Displays refined AI analysis after follow-up questions
 */

import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import Card from './Card';

const UpdatedAnalysis = ({ isRefined = false }) => {
  if (!isRefined) return null;

  return (
    <Card className="border-2 border-green-300 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="w-6 h-6 text-green-600" />
        <div>
          <h3 className="text-lg font-bold text-green-900">
            ✨ Refined Analysis
          </h3>
          <p className="text-sm text-green-700">
            Updated based on your additional responses
          </p>
        </div>
      </div>
      <div className="mt-3 p-3 bg-white rounded-lg border border-green-200">
        <div className="flex items-center gap-2 text-sm text-green-800">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">AI has refined the assessment with your detailed answers</span>
        </div>
      </div>
    </Card>
  );
};

export default UpdatedAnalysis;
