import React from 'react';
import { ArrowLeft, Clock, Users, DollarSign, CheckCircle, Utensils } from 'lucide-react';
import { UserData } from './UserForm';

interface DietPlanProps {
  userData: UserData;
  onBack: () => void;
  onRestart: () => void;
}

const DietPlan: React.FC<DietPlanProps> = ({ userData, onBack, onRestart }) => {
  // Calculate BMR and daily calories
  const calculateBMR = () => {
    const { age, gender, currentWeight, height } = userData;
    if (gender === 'male') {
      return 88.362 + (13.397 * currentWeight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * currentWeight) + (3.098 * height) - (4.330 * age);
    }
  };

  const getActivityMultiplier = () => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    return multipliers[userData.activityLevel as keyof typeof multipliers] || 1.2;
  };

  const bmr = calculateBMR();
  const maintenanceCalories = Math.round(bmr * getActivityMultiplier());
  
  let targetCalories = maintenanceCalories;
  if (userData.goal === 'gain') targetCalories += 500;
  if (userData.goal === 'lose') targetCalories -= 500;

  const mealPlans = {
    gain: {
      title: "Weight Gain Meal Plan",
      description: "High-calorie, nutrient-dense meals to support healthy weight gain",
      color: "from-emerald-500 to-emerald-600",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          calories: Math.round(targetCalories * 0.25),
          items: [
            "3 whole eggs + 2 egg whites scrambled with 1 tbsp olive oil",
            "2 slices whole grain bread with peanut butter",
            "1 medium banana",
            "1 glass full-fat milk"
          ]
        },
        {
          name: "Mid-Morning Snack",
          time: "10:00 AM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "Handful of mixed nuts (almonds, walnuts, cashews)",
            "1 medium apple"
          ]
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          calories: Math.round(targetCalories * 0.3),
          items: [
            "1.5 cups cooked rice or quinoa",
            "150g grilled chicken breast or 1 cup cooked lentils",
            "Mixed vegetable curry with coconut oil",
            "1 cup plain yogurt"
          ]
        },
        {
          name: "Evening Snack",
          time: "4:30 PM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "Smoothie: 1 banana, 1 cup milk, 2 tbsp oats, 1 tbsp honey"
          ]
        },
        {
          name: "Dinner",
          time: "7:30 PM",
          calories: Math.round(targetCalories * 0.25),
          items: [
            "2 whole wheat rotis or 1 cup brown rice",
            "Dal (lentils) - 1 cup",
            "Grilled fish or paneer curry",
            "Sautéed vegetables with ghee"
          ]
        }
      ]
    },
    maintain: {
      title: "Weight Maintenance Meal Plan",
      description: "Balanced nutrition to maintain your current weight and energy",
      color: "from-sky-500 to-sky-600",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          calories: Math.round(targetCalories * 0.25),
          items: [
            "2 whole eggs + 1 egg white omelet with vegetables",
            "2 slices whole grain toast",
            "1 medium fruit (apple/orange)",
            "1 cup green tea"
          ]
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "10-12 almonds",
            "1 small seasonal fruit"
          ]
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          calories: Math.round(targetCalories * 0.3),
          items: [
            "1 cup cooked brown rice or 2 rotis",
            "100g lean protein (chicken/fish/tofu)",
            "Mixed vegetable sabzi",
            "Small bowl of curd"
          ]
        },
        {
          name: "Evening Snack",
          time: "4:30 PM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "1 cup buttermilk",
            "Small handful of nuts"
          ]
        },
        {
          name: "Dinner",
          time: "7:30 PM",
          calories: Math.round(targetCalories * 0.25),
          items: [
            "2 rotis or 3/4 cup rice",
            "Dal or legumes - 3/4 cup",
            "Grilled/steamed vegetables",
            "Small bowl of salad"
          ]
        }
      ]
    },
    lose: {
      title: "Weight Loss Meal Plan",
      description: "Calorie-controlled, satisfying meals for sustainable weight loss",
      color: "from-orange-500 to-orange-600",
      meals: [
        {
          name: "Breakfast",
          time: "7:00 AM",
          calories: Math.round(targetCalories * 0.25),
          items: [
            "2 egg whites + 1 whole egg scrambled",
            "1 slice whole grain bread",
            "1 cup mixed berries or 1 medium fruit",
            "1 cup green tea"
          ]
        },
        {
          name: "Mid-Morning Snack",
          time: "10:30 AM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "1 small apple with 1 tbsp almond butter",
            "Herbal tea"
          ]
        },
        {
          name: "Lunch",
          time: "1:00 PM",
          calories: Math.round(targetCalories * 0.35),
          items: [
            "Large mixed salad with olive oil dressing",
            "100g grilled chicken/fish or 3/4 cup cooked legumes",
            "1/2 cup brown rice or 1 small roti",
            "Steamed vegetables"
          ]
        },
        {
          name: "Evening Snack",
          time: "4:30 PM",
          calories: Math.round(targetCalories * 0.1),
          items: [
            "1 cup vegetable soup",
            "5-6 nuts"
          ]
        },
        {
          name: "Dinner",
          time: "7:00 PM",
          calories: Math.round(targetCalories * 0.2),
          items: [
            "Grilled vegetables or salad",
            "100g lean protein",
            "1 small bowl of soup",
            "Herbal tea"
          ]
        }
      ]
    }
  };

  const currentPlan = mealPlans[userData.goal as keyof typeof mealPlans];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{currentPlan.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{currentPlan.description}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 bg-gradient-to-r ${currentPlan.color} rounded-lg flex items-center justify-center`}>
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Daily Calories</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{targetCalories}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Meals</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentPlan.meals.length}</p>
            <p className="text-sm text-gray-500">per day</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Portions</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">1-2</p>
            <p className="text-sm text-gray-500">servings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Cost</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">Low</p>
            <p className="text-sm text-gray-500">kitchen-friendly</p>
          </div>
        </div>

        {/* Meal Plan */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {currentPlan.meals.map((meal, index) => (
            <div key={meal.name} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${currentPlan.color} p-6 text-white`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{meal.name}</h3>
                    <p className="text-white/80">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{meal.calories}</p>
                    <p className="text-white/80 text-sm">calories</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {meal.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Pro Tips for Success</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Drink 8-10 glasses of water daily</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Prepare meals in advance when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Include seasonal fruits and vegetables</span>
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Cook with minimal oil and use healthy fats</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Listen to your body's hunger and fullness cues</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-700">Stay consistent and be patient with results</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </button>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Create New Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;