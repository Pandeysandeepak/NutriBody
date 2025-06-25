import React, { useState } from "react";
// import Hero from "./components/Hero";
// import GoalSelection from "./components/GoalSelection";
// import UserForm, { UserData } from "./components/UserForm";
// import DietPlan from "./components/DietPlan";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/signUpPage";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { HOME_URL, SIGNIN_URL , SIGNUP_URL } from "./components/constants";

// type Step = 'hero' | 'goal' | 'form' | 'plan';

function App() {
  // const [currentStep, setCurrentStep] = useState < Step > "hero";
  // const [selectedGoal, setSelectedGoal] = useState < string > "";
  // const [userData, setUserData] = (useState < UserData) | (null > null);

  // const handleGetStarted = () => {
  //   setCurrentStep('goal');
  // };

  // const handleGoalSelection = (goal: string) => {
  //   setSelectedGoal(goal);
  //   setCurrentStep('form');
  // };

  // const handleFormSubmit = (data: UserData) => {
  //   setUserData(data);
  //   setCurrentStep('plan');
  // };

  // const handleBackToHero = () => {
  //   setCurrentStep('hero');
  //   setSelectedGoal('');
  //   setUserData(null);
  // };

  // const handleBackToGoal = () => {
  //   setCurrentStep('goal');
  // };

  const handleBackToForm = () => {
    setCurrentStep("form");
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={HOME_URL} element={<HomePage />} />
          <Route path={SIGNUP_URL} element={<SignUpPage />} />
          <Route path={SIGNIN_URL} element={<SignUpPage />} />
        </Routes>

        {/* 
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
        */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
