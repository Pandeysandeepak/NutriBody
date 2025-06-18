import React, { useState } from 'react';
import { TrendingUp, Target, Activity, ArrowLeft, ArrowRight } from 'lucide-react';

interface GoalSelectionProps {
  onBack: () => void;
  onNext: (goal: string) => void;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onBack, onNext }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const goals = [
    {
      id: 'gain',
      title: 'Weight Gain',
      description: 'Build healthy muscle mass and increase weight',
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200 hover:border-emerald-400',
      details: 'Perfect for those looking to gain weight healthily with nutrient-dense foods'
    },
    {
      id: 'maintain',
      title: 'Weight Maintenance',
      description: 'Maintain current weight with balanced nutrition',
      icon: Target,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'from-sky-50 to-sky-100',
      borderColor: 'border-sky-200 hover:border-sky-400',
      details: 'Ideal for maintaining your current weight while optimizing nutrition'
    },
    {
      id: 'lose',
      title: 'Weight Loss',
      description: 'Sustainable weight loss with satisfying meals',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      borderColor: 'border-orange-200 hover:border-orange-400',
      details: 'Sustainable approach to weight loss without compromising on taste or nutrition'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What's Your Goal?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your primary objective so we can create a personalized meal plan that fits your lifestyle and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;
            
            return (
              <div
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  isSelected ? 'scale-105 shadow-2xl' : 'hover:shadow-xl'
                }`}
              >
                <div className={`bg-gradient-to-br ${goal.bgColor} rounded-3xl p-8 border-2 transition-all duration-300 ${
                  isSelected ? `${goal.borderColor.split('hover:')[1]} shadow-lg` : goal.borderColor
                }`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${goal.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">{goal.title}</h3>
                  <p className="text-gray-600 mb-4 text-center text-lg">{goal.description}</p>
                  <p className="text-sm text-gray-500 text-center leading-relaxed">{goal.details}</p>
                  
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl pointer-events-none">
                      <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={() => selectedGoal && onNext(selectedGoal)}
            disabled={!selectedGoal}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedGoal
                ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelection;