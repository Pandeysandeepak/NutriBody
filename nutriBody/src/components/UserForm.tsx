import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Scale, Ruler, Calendar } from 'lucide-react';

interface UserFormProps {
  goal: string;
  onBack: () => void;
  onNext: (userData: UserData) => void;
}

export interface UserData {
  age: number;
  gender: string;
  currentWeight: number;
  height: number;
  activityLevel: string;
  targetWeight?: number;
  goal: string;
}

const UserForm: React.FC<UserFormProps> = ({ goal, onBack, onNext }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    currentWeight: '',
    height: '',
    activityLevel: '',
    targetWeight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: UserData = {
      age: parseInt(formData.age),
      gender: formData.gender,
      currentWeight: parseFloat(formData.currentWeight),
      height: parseFloat(formData.height),
      activityLevel: formData.activityLevel,
      targetWeight: formData.targetWeight ? parseFloat(formData.targetWeight) : undefined,
      goal
    };
    onNext(userData);
  };

  const isFormValid = formData.age && formData.gender && formData.currentWeight && 
                     formData.height && formData.activityLevel;

  const goalTitles = {
    gain: 'Weight Gain',
    maintain: 'Weight Maintenance',
    lose: 'Weight Loss'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tell Us About Yourself</h2>
          <p className="text-lg text-gray-600">
            We need some basic information to create your personalized {goalTitles[goal as keyof typeof goalTitles]} plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your age"
                min="18"
                max="100"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Scale className="w-4 h-4" />
                Current Weight (kg)
              </label>
              <input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter current weight"
                min="30"
                max="300"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Ruler className="w-4 h-4" />
                Height (cm)
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter height"
                min="100"
                max="250"
                required
              />
            </div>
          </div>

          {(goal === 'gain' || goal === 'lose') && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Scale className="w-4 h-4" />
                Target Weight (kg) - Optional
              </label>
              <input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter target weight"
                min="30"
                max="300"
                step="0.1"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">Activity Level</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                { value: 'light', label: 'Light Activity', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderate Activity', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' }
              ].map((activity) => (
                <label key={activity.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="activityLevel"
                    value={activity.value}
                    checked={formData.activityLevel === activity.value}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{activity.label}</div>
                    <div className="text-xs text-gray-500">{activity.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isFormValid
                  ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;