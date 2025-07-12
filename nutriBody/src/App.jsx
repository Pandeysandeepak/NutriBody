import React, { useState } from "react";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/signUpPage";
import theme from "./components/theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ADMIN_DIETPLAN_URL, ADMIN_PROFILE, HOME_URL, SIGNIN_URL, SIGNUP_URL, USER_PROFILE } from "./components/constants";
import AdminProfile from "./components/Admin/adminProfile";
import AdminDietPlan from "./components/adminDietPlan";
import UserProfilePage from "./components/User/userProfilePage";

function App() {

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
          <Route path={ADMIN_PROFILE} element={<AdminProfile />} />
          <Route path={ADMIN_DIETPLAN_URL} element={<AdminDietPlan />} />
          <Route path={USER_PROFILE} element={<UserProfilePage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
