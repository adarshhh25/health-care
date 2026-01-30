/**
 * Follow-Up Questions Component
 * Interactive component for answering AI-generated follow-up questions
 */

import { useState } from 'react';
import { HelpCircle, Send } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const FollowUpQuestions = ({ questions, onSubmit, loading }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleSubmit = () => {
    // Format answers as array with question-answer pairs
    const formattedAnswers = questions.map((question, index) => ({
      question,
      answer: answers[index] || '',
    }));
    onSubmit(formattedAnswers);
  };

  // Check if at least one question is answered
  const hasAnswers = Object.values(answers).some(answer => answer && answer.trim() !== '');

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900">
            Help Us Understand Better
          </h3>
          <p className="text-sm text-blue-700">
            Answer these questions for a more accurate analysis
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {index + 1}. {question}
            </label>
            <textarea
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="2"
              disabled={loading}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleSubmit}
          disabled={loading || !hasAnswers}
          icon={Send}
          fullWidth
        >
          {loading ? 'Analyzing Answers...' : 'Submit Follow-Up Answers'}
        </Button>
      </div>

      {!hasAnswers && (
        <p className="text-sm text-blue-600 mt-3 text-center">
          Please answer at least one question to continue
        </p>
      )}
    </Card>
  );
};

export default FollowUpQuestions;
