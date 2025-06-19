import { CssBaseline, Grid, Typography } from "@mui/material";
import BlobWrapper from "../Atoms/BlobBackground";
import ReusableButton from "../Atoms/ReusableButton";
import ReusableTextField from "../Atoms/ReusableInputField";

const SignUpPage = () => {
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
          overflow: "auto",
        }}
      >
        <BlobWrapper />

        {/* Main Content */}
        <Grid
          item
          container
          xs={12}
          sx={{
            zIndex: 5,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Grid
            container
            xs={12}
            sx={{
              width: "70rem",
              height: "40rem",
              border: "1rem solid rgba(3, 92, 8, 0.96)",
            }}
          >
            <Grid
              item
              container
              xs={5}
              gap={"1rem"}
              sx={{
                backgroundColor: "rgba(7, 163, 15, 0.8)",
                height: "100%",
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
              flexDirection={"column"}
            >
              <Typography
                sx={{ fontSize: "2rem", color: "white", fontWeight: 700 }}
              >
                Hello !
              </Typography>

              <ReusableButton
                background="rgba(237, 244, 18, 0.81)"
                textColor="linear-gradient(to right, #059669, #0284c7)"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                transform="translateY(-2px)"
                boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
                width="8rem"
                height="2.85rem"
                borderRadius="0.5rem"
                fontSize="1.1rem"
                buttonText="Sign up"
                fontWeight={600}
              />
            </Grid>

            <Grid
              item
              xs={7}
              sx={{
                backgroundColor: "transparent",
                height: "100%",
                width: "60%",
                display:"flex",
                justifyContent:"center",
                my:"1rem"
              }}
            >
                <ReusableTextField/>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpPage;
