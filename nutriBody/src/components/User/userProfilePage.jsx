import React, { useState } from "react";
import {
  CssBaseline,
  Grid,
  Typography,
  Paper,
  Box,
  useTheme,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DashboardMenubar from "../../Atoms/dashboardMenubar";
import ReusableField from "../../Atoms/ReusableField";
import ReusableButton from "../../Atoms/ReusableButton";

const UserProfilePage = () => {
  const theme = useTheme();

  const [data, setData] = useState({
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

  const handleDataChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProceedClick = () => {
    console.log("Collected user data:", data);
    // Add logic here to send or process the data
  };

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        {/* Sidebar */}
        <Grid item sx={{ width: "15%" }}>
          <DashboardMenubar />
        </Grid>

        {/* Main Form Section */}
        <Grid item sx={{ width: "85%", p: "1rem" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "2rem",
              color: theme.palette.borderGreen,
              mb: 2,
            }}
          >
            User Profile
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
              boxShadow: "0px 4px 8rem rgba(0, 128, 0, 0.3)",
            }}
          >
            <ReusableField
              label="Name :"
              width="12.5rem"
              onChange={(e) => handleDataChange("name", e.target.value)}
            />
            <ReusableField
              label="Age :"
              width="12.5rem"
              onChange={(e) => handleDataChange("age", e.target.value)}
            />
            <ReusableField
              label="Height (cm) :"
              width="12.5rem"
              onChange={(e) => handleDataChange("height", e.target.value)}
            />
            <ReusableField
              label="Weight (kg) :"
              width="12.5rem"
              onChange={(e) => handleDataChange("weight", e.target.value)}
            />

            {/* Activity Level */}
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "15rem" }}>Activity Level:</Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  onChange={(e) => handleDataChange("activityLevel", e.target.value)}
                >
                  <FormControlLabel value="sedentary" control={<Radio />} label="Sedentary" />
                  <FormControlLabel value="light" control={<Radio />} label="Lightly active" />
                  <FormControlLabel value="moderate" control={<Radio />} label="Moderately active" />
                  <FormControlLabel value="very" control={<Radio />} label="Very active" />
                  <FormControlLabel value="extra" control={<Radio />} label="Extra active" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Goal */}
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "15rem" }}>Goal:</Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  onChange={(e) => handleDataChange("goal", e.target.value)}
                >
                  <FormControlLabel value="loose" control={<Radio />} label="Lose weight" />
                  <FormControlLabel value="gain" control={<Radio />} label="Gain weight" />
                  <FormControlLabel value="maintain" control={<Radio />} label="Maintain weight" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Dietary Preferences */}
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "15rem" }}>Dietary Preferences:</Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  onChange={(e) => handleDataChange("dietType", e.target.value)}
                >
                  <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian" />
                  <FormControlLabel value="non-vegetarian" control={<Radio />} label="Non-vegetarian" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Considerations */}
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "15rem" }}>Considerations:</Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  onChange={(e) => handleDataChange("consideration", e.target.value)}
                >
                  <FormControlLabel value="low sugar" control={<Radio />} label="Low sugar" />
                  <FormControlLabel value="diabetic-friendly" control={<Radio />} label="Diabetic friendly" />
                  <FormControlLabel value="avoid fried food" control={<Radio />} label="Avoid fried food" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Meal Frequency */}
            <Grid sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ width: "15rem" }}>Meal Frequency:</Typography>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  onChange={(e) => handleDataChange("mealFrequency", e.target.value)}
                >
                  <FormControlLabel value="3" control={<Radio />} label="3 meals" />
                  <FormControlLabel value="5" control={<Radio />} label="5 meals" />
                  <FormControlLabel value="intermittent" control={<Radio />} label="Intermittent fasting" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end">
              <ReusableButton
                background={theme.palette.borderGreen}
                textColor={theme.palette.white}
                boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
                width="20%"
                height="2.85rem"
                borderRadius="0.5rem"
                fontSize="1.1rem"
                buttonText="Save"
                fontWeight={600}
                my="1rem"
                onClick={handleProceedClick}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfilePage;
