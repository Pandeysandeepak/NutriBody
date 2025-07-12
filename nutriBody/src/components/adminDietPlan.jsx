import {
  CssBaseline,
  Grid,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import DashboardMenubar from "../Atoms/dashboardMenubar";
import React from "react";
import ReusableField from "../Atoms/ReusableField";
import ReusableButton from "../Atoms/ReusableButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { GENERATE_DIET_PLAN_URL } from "./constants";
import DietPlanTabs from "./dietPlan";

const AdminDietPlan = () => {
  const theme = useTheme();
  const [defaultDataState, setDefaultDataState] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietType: "",
    consideration: "",
    mealFrequency: "",
  });
  const [data, setData] = useState(defaultDataState);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [response, setResponse] = useState(null);

  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const gender = localStorage.getItem("gender");
    setToken(token);
    setEmail(email);
    setGender(gender);
  }, []);

  const handleProceedClick = async () => {
    const payload = {
      name: data.name,
      age: data.age,
      height: data.height,
      weight: data.weight,
      activityLevel: data.activityLevel,
      goal: data.goal,
      dietaryPreference: data.dietType,
      consideration: data.consideration,
      mealFrequency: data.mealFrequency,
      email: email,
      gender: gender,
    };

    try {
      const response = await axios.post(GENERATE_DIET_PLAN_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("AI Response:", response?.data);
      alert("Generated successfully");
      setResponse(response?.data);
    } catch (error) {
      alert("Error generating diet plan:");
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Grid item sx={{ width: "15%" }}>
          <DashboardMenubar />
        </Grid>

        {/* Main Form */}
        {response ? (
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "85%",
              maxHeight: "100vh",
              overflow: "auto",
            }}
          >
            <DietPlanTabs response={response} />
          </Grid>
        ) : (
          <Grid
            item
            sx={{ display: "flex", flexDirection: "column", width: "80%" }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: 800,
                my: "0.5rem",
                color: "green",
              }}
            >
              Get Diet Plan
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
                boxShadow: "0px 4px 8rem rgba(0, 128, 0, 0.3)", // Green box shadow
              }}
            >
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
                Step 1: Fill Basic details -
              </Typography>

              <ReusableField
                label={"Name :"}
                width={"12.5rem"}
                onChange={(e) => {
                  handleDataChange("name", e.target.value);
                }}
              />

              <ReusableField
                label={"Age :"}
                width={"12.5rem"}
                onChange={(e) => {
                  handleDataChange("age", e.target.value);
                }}
              />
              <ReusableField
                label={"Height (cm) :"}
                width={"12.5rem"}
                onChange={(e) => {
                  handleDataChange("height", e.target.value);
                }}
              />
              <ReusableField
                label={"Weight (kg) :"}
                width={"12.5rem"}
                onChange={(e) => {
                  handleDataChange("weight", e.target.value);
                }}
              />

              {/* Activity */}
              <Grid
                sx={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <Typography sx={{ width: "15rem" }}>
                  Activity Level:{" "}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="activityLevel"
                    row
                    sx={{ gap: "2.8rem" }}
                    onChange={(e) => {
                      handleDataChange("activityLevel", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="sedentary"
                      control={<Radio />}
                      label="Sedentary"
                    />
                    <FormControlLabel
                      value="light"
                      control={<Radio />}
                      label="Lightly active"
                    />
                    <FormControlLabel
                      value="moderate"
                      control={<Radio />}
                      label="Moderately active"
                    />
                    <FormControlLabel
                      value="very"
                      control={<Radio />}
                      label="Very active"
                    />
                    <FormControlLabel
                      value="extra"
                      control={<Radio />}
                      label="Extra active"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Goal */}
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15rem" }}>Goal: </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="goal"
                    row
                    sx={{ gap: "2rem" }}
                    onChange={(e) => {
                      handleDataChange("goal", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="loose"
                      control={<Radio />}
                      label="Loose weight"
                    />
                    <FormControlLabel
                      value="gain"
                      control={<Radio />}
                      label="Gain weight"
                    />
                    <FormControlLabel
                      value="maintain"
                      control={<Radio />}
                      label="Maintain weight"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Dietary  */}
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15rem" }}>
                  Dietary Prefrences:{" "}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="dietaryPreference"
                    row
                    sx={{ gap: "2.7rem" }}
                    onChange={(e) => {
                      handleDataChange("dietType", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="vegetarian"
                      control={<Radio />}
                      label="Vegetarian"
                    />
                    <FormControlLabel
                      value="non-vegetarian"
                      control={<Radio />}
                      label="Non-vegetarian"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Consideration */}
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15rem" }}>
                  Considerations:{" "}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="consideration"
                    row
                    sx={{ gap: "3rem" }}
                    onChange={(e) => {
                      handleDataChange("consideration", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="low sugar"
                      control={<Radio />}
                      label="Low sugar"
                    />
                    <FormControlLabel
                      value="diabetic-friendly"
                      control={<Radio />}
                      label="Diabetic friendly"
                    />
                    <FormControlLabel
                      value="avoid fried food"
                      control={<Radio />}
                      label="Avoid fried food"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Meal Frequency */}
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ width: "15rem" }}>
                  Meal Frequency:{" "}
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    name="mealFrequency"
                    row
                    sx={{ gap: "4.2rem" }}
                    onChange={(e) => {
                      handleDataChange("mealFrequency", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3 meals"
                    />
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="5 meals"
                    />
                    <FormControlLabel
                      value="intermittent"
                      control={<Radio />}
                      label="Intermittent fasting"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Submit */}
              <Box display="flex" justifyContent="flex-end">
                <ReusableButton
                  background={theme.palette.borderGreen}
                  textColor={theme.palette.white}
                  boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
                  width="20%"
                  height="2.85rem"
                  borderRadius="0.5rem"
                  fontSize="1.1rem"
                  buttonText="Proceed"
                  fontWeight={600}
                  my="1rem"
                  onClick={handleProceedClick}
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdminDietPlan;
