import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ReusableTextField = (props) => {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="column"
      xs={12}
      sx={{
        width:  props.containerWidth || "30rem",
        backgroundColor: "transparent",
        height: "4.5rem",
      }}
    >
      {/* Label */}
      <Grid item>
        <Typography sx={{ fontWeight: 600, color: theme.palette.borderGreen }}>
          {props.label}
        </Typography>
      </Grid>

      {/* TextField */}
      <Grid item>
        <TextField
          variant="outlined"
          error={!!props.errorText}
          fullWidth
          onChange={props.onChange}
          sx={{
            "& .MuiInputBase-root": {
              height: "2rem",
              "& fieldset": {
                border: props.borderColor,
              },
              "&:hover fieldset": {
                border: props.borderColor,
              },
              "&.Mui-focused fieldset": {
                border: props.borderColor,
              },
            },
            "& input": {
              px: "0.5rem",
              height: "1rem",
              boxSizing: "border-box",
            },
          }}
        />
      </Grid>
      <Grid item>
        <Typography sx={{ fontWeight: 400, color: theme.palette.red, height:"1rem", fontSize:"0.8rem" }}>
          {props.errorText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const ReusablePasswordField = (props) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid
      container
      direction="column"
      xs={12}
      sx={{
        width: "30rem",
        backgroundColor: "transparent",
        height: "4.5rem",
      }}
    >
      <Grid item>
        <Typography sx={{ fontWeight: 600, color: theme.palette.borderGreen }}>
          {props.label}
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={!!props.errorText}
          onChange={props.onChange}
          fullWidth
          sx={{
            "& .MuiInputBase-root": {
              height: "2rem",
              "& fieldset": {
                border: props.borderColor,
              },
              "&:hover fieldset": {
                border: props.borderColor,
              },
              "&.Mui-focused fieldset": {
                border: props.borderColor,
              },
            },
            "& input": {
              px: "0.5rem",
              height: "1rem",
              boxSizing: "border-box",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ shrink: false }}
        />
      </Grid>
      <Grid item>
        <Typography sx={{ fontWeight: 400, color: theme.palette.red, height:"1rem" , fontSize:"0.8rem" }}>
          {props.errorText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReusableTextField;
