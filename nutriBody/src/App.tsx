import React, { useState } from 'react';
import Hero from './components/Hero';
import GoalSelection from './components/GoalSelection';
import UserForm, { UserData } from './components/UserForm';
import DietPlan from './components/DietPlan';

type Step = 'hero' | 'goal' | 'form' | 'plan';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('goal');
  };

  const handleGoalSelection = (goal: string) => {
    setSelectedGoal(goal);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentStep('plan');
  };

  const handleBackToHero = () => {
    setCurrentStep('hero');
    setSelectedGoal('');
    setUserData(null);
  };

  const handleBackToGoal = () => {
    setCurrentStep('goal');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div>
      {currentStep === 'hero' && (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === 'goal' && (
        <GoalSelection 
          onBack={handleBackToHero}
          onNext={handleGoalSelection}
        />
      )}
      
      {currentStep === 'form' && (
        <UserForm 
          goal={selectedGoal}
          onBack={handleBackToGoal}
          onNext={handleFormSubmit}
        />
      )}
      
      {currentStep === 'plan' && userData && (
        <DietPlan 
          userData={userData}
          onBack={handleBackToForm}
          onRestart={handleBackToHero}
        />
      )}
    </div>
  );
}

export default App;