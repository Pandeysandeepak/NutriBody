import Grid from "@mui/material/Grid";
import { CssBaseline, Typography, Box, Card } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SparklesIcon from "@mui/icons-material/AutoAwesome";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ReusableButton from "../Atoms/ReusableButton";
import ICONS from "../Atoms/Icons";
import BlobWrapper from "../Atoms/BlobBackground";

const ReusableCard = (props) => {
  const IconComponent = ICONS[props.icon];
  return (
    <Card
      container
      sx={{
        height: "15rem",
        width: "15rem",
        background: "white",
        borderRadius: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0 8px 24px rgba(5, 150, 105, 0.3)",
        gap: "1rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 36px rgba(5, 150, 105, 0.4)",
        },
      }}
    >
      <Box
        item
        sx={{
          height: "5rem",
          width: "5rem",
          background: props.color,
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {IconComponent && <IconComponent sx={{ color: "white" }} />}
      </Box>

      <Typography
        item
        sx={{ fontWeight: 700, color: "black", fontSize: "1.1rem" }}
      >
        {props.heading}
      </Typography>

      <Typography
        item
        sx={{
          fontWeight: 500,
          color: "grey",
          fontSize: "0.8rem",
          px: "0.5rem",
        }}
      >
        {props.body}
      </Typography>
    </Card>
  );
};

const HomePage = () => {
  const content = ["Weight Gain ", "Weight Maintenance", "Weight Loss"];

  return (
    <>
      <CssBaseline />
      <Grid
        container
        direction="column"
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BlobWrapper />
        {/* Main Content */}
        <Grid
          item
          xs={12}
          sx={{
            position: "relative",
            zIndex: 5,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Sign Up Button */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <ReusableButton
              background="linear-gradient(to right, #059669, #0284c7)"
              textColor="white"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              transform="translateY(-2px)"
              boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
              width="8rem"
              height="2.85rem"
              borderRadius="0.5rem"
              fontSize="1.1rem"
              buttonText="Log in"
            />
          </Box>

          {/* Centered Typography */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2,
              textAlign: "center",
              my: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "4rem",
                fontWeight: 900,
                background: "linear-gradient(to right, #059669, #0284c7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Balanced Being
            </Typography>
            <Typography
              sx={{
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#334155",
                maxWidth: "600px",
                mt: 2,
              }}
            >
              Your personalized diet companion for achieving weight goals with
              affordable, kitchen-friendly ingredients and scientifically-backed
              meal plans.
            </Typography>

            <Grid
              sx={{
                display: "flex ",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "15rem ",
                width: "100%",
                my: "2rem",
                px: "18rem",
              }}
            >
              <ReusableCard
                icon="TrendingUpIcon"
                color="#10B981"
                heading="Weight Maintenance"
                body="Healthy muscle building and weight gain with nutrient-dense meals"
              />

              <ReusableCard
                icon="FitnessCenterIcon"
                color="#0284C7"
                heading="Weight Loss"
                body="Balanced nutrition to maintain your ideal weight and energy levels"
              />

              <ReusableCard
                icon="FastfoodIcon"
                color="#F97316"
                heading="Weight Gain"
                body="Sustainable fat loss with satisfying, nutrition-packed meals"
              />
            </Grid>
            <Grid sx={{ width: "100%", height: "4rem", my: "1.5rem" }}>
              <ReusableButton
                width="20rem"
                height="4rem"
                background="linear-gradient(to right, #059669, #0284c7)"
                borderRadius="5rem"
                textColor="white"
                fontSize="1rem"
                textTransform="none"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                transform="translateX(1px)"
                boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
                buttonText="Start Your journey"
              />

              <ArrowForwardIcon sx={{ color: "white", mx: "0.5rem" }} />

              <Grid sx={{ my: "2.5rem" }}>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <SparklesIcon fontSize="small" sx={{ color: "#f59e0b" }} />{" "}
                  Affordable ingredients •
                  <ReceiptLongIcon
                    fontSize="small"
                    sx={{ color: "#6366f1" }}
                  />{" "}
                  Kitchen-friendly recipes •
                  <InsertChartIcon
                    fontSize="small"
                    sx={{ color: "#10b981" }}
                  />{" "}
                  Personalized plans
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: "0.9rem",
                    mt: 1,
                  }}
                >
                  Join thousands who've transformed their health with NutriPlan
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
