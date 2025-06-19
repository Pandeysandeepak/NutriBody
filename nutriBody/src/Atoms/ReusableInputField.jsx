import { Grid, TextField, Typography } from "@mui/material";

const ReusableTextField = (props) => {
  return (
    <>
      <Grid
        container
        direction="column"
        sx={{
          width: "30rem",
          height: "4rem", 
          backgroundColor: "white",
        }}
      >
        {/* Label */}
        <Grid item sx={{ backgroundColor: "transparent" }}>
          <Typography>Text:</Typography>
        </Grid>

        {/* TextField below */}
        <Grid
          item
          sx={{
            flexGrow: 1,
            display: "flex",
            backgroundColor: "transparent", 
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              flexGrow: 1,
              "& .MuiInputBase-root": {
                height: "100%",
              },
              "& input": {
                height: "100%",
                padding: "0.5rem",
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReusableTextField;
