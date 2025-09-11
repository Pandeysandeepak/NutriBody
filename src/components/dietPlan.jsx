import React from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const DietPlanTabs = ({ response }) => {
  const introNotes = response?.introNotes;
  const dailyPlan = response?.dailyPlan;
  const ingredients = response?.ingredients;
  const importantNotes = response?.importantNotes;
  const closingNote = response?.closingNote;

  const [tabIndex, setTabIndex] = React.useState(0);

  const days = Object.keys(dailyPlan ?? {});
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const formatDay = (dayKey) => dayKey.replace("day", "Day ");

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 2 }}>
      {introNotes && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Intro
          </Typography>
          <Typography variant="body1">{introNotes}</Typography>
        </Paper>
      )}

      {days.length > 0 && (
        <Box>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {days.map((dayKey) => (
              <Tab key={dayKey} label={formatDay(dayKey)} />
            ))}
          </Tabs>

          {days.map((dayKey, index) =>
            tabIndex === index ? (
              <Box key={dayKey} sx={{ mt: 2 }}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    {formatDay(dayKey)} Meals
                  </Typography>
                  {Object.entries(dailyPlan?.[dayKey] ?? {}).map(
                    ([mealType, description]) => (
                      <Box key={mealType} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {mealType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {description || "-"}
                        </Typography>
                      </Box>
                    )
                  )}
                </Paper>
              </Box>
            ) : null
          )}
        </Box>
      )}

      {ingredients && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Ingredients Summary
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(ingredients ?? {}).map(([category, items]) => (
              <Grid item xs={12} sm={6} md={4} key={category}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {category}
                </Typography>
                <Typography variant="body2">
                  {items?.join(", ") || "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {importantNotes && importantNotes.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Important Notes
          </Typography>
          <List>
            {importantNotes?.map((note, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemText primary={`• ${note}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {closingNote && (
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mt: 4, fontStyle: "italic" }}
        >
          {closingNote}
        </Typography>
      )}
    </Box>
  );
};

export default DietPlanTabs;
