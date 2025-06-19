import { Button } from "@mui/material";

const ReusableButton = (props) => {
  return (
    <Button
      sx={{
        width: props.width,
        height: props.height,
        background: props.background,
        borderRadius: props.borderRadius,
        color: props.textColor,
        fontSize: props.fontSize,
        textTransform: "none",
        transition: props.transition,
        fontWeight: props.fontWeight,
        "&:hover": {
          transform: props.transform,
          boxShadow: props.boxShadow,
        },
      }}
    >
      {props.buttonText}
    </Button>
  );
};

export default ReusableButton
