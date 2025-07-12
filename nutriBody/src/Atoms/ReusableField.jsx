import ReusableTextField from "./ReusableInputField";
import { Grid, Typography, useTheme} from "@mui/material";

const ReusableField = (props) => {
  const theme = useTheme();

  return (
    <Grid container sx={{ height: "2rem", width: "auto", display: "flex" }}>
      <Typography sx={{ width: props.width? props.width : "10rem" }}>{props.label}</Typography>

      <ReusableTextField
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        containerWidth={"19rem"}
        onChange={props.onChange}
      />
    </Grid>
  );
};

export default ReusableField