import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Calendar, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';

const SymptomForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: '',
    duration: ''
  });

  const [errors, setErrors] = useState({});

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const durationOptions = [
    { value: 'few-hours', label: 'A few hours' },
    { value: '1-day', label: '1 day' },
    { value: '2-3-days', label: '2-3 days' },
    { value: '1-week', label: 'About a week' },
    { value: '2-weeks', label: '2 weeks or more' },
    { value: '1-month', label: '1 month or longer' }
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (!formData.symptoms || formData.symptoms.trim().length < 10) {
      newErrors.symptoms = 'Please describe your symptoms in detail (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Age and Gender Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
          error={errors.age}
          icon={User}
          required
          min="1"
          max="120"
        />
        
        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          placeholder="Select gender"
        />
      </div>

      {/* Symptoms */}
      <Textarea
        label="Describe Your Symptoms"
        placeholder="Please describe your symptoms in detail. Include information about:&#10;• What symptoms you're experiencing&#10;• When they started&#10;• How severe they are (mild, moderate, severe)&#10;• Any other relevant details"
        value={formData.symptoms}
        onChange={(e) => handleChange('symptoms', e.target.value)}
        error={errors.symptoms}
        required
        rows={6}
      />

      {/* Duration */}
      <Select
        label="How long have you had these symptoms?"
        options={durationOptions}
        value={formData.duration}
        onChange={(e) => handleChange('duration', e.target.value)}
        placeholder="Select duration"
        icon={Clock}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        loading={loading}
        fullWidth
        size="lg"
        icon={Send}
        iconPosition="right"
      >
        Analyze Symptoms
      </Button>

      {/* Privacy Notice */}
      <p className="text-sm text-gray-500 text-center">
        Your information is processed securely and not stored permanently. 
        See our privacy policy for details.
      </p>
    </motion.form>
  );
};

export default SymptomForm;
