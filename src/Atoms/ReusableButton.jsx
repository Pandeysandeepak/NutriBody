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
        border: props.border,
        boxShadow: props.boxShadow,
        my: props.my,
        "&:hover": {
          transform: props.transform,
          boxShadow: props.boxShadow,
        },
        "&.Mui-disabled": {
          opacity: 0.5, 
          background: props.background, 
          color: props.textColor, 
          cursor: "not-allowed", 
        },
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </Button>
  );
};

export default ReusableButton;
