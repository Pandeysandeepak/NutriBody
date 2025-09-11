import { CssBaseline, Grid, Typography, Paper, Box } from "@mui/material";
import BlobWrapper from "../Atoms/BlobBackground";
import ReusableButton from "../Atoms/ReusableButton";
import ReusableTextField, {
  ReusablePasswordField,
} from "../Atoms/ReusableInputField";
import SignInIcon from "../Assets/SignInIcon.png";
import GoogleIcon from "../Assets/google.png";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  nameValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "./validation";
import { ADMIN_PROFILE, CREATE_USER_URL, LOG_IN_URL, USER_PROFILE } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });
  const [initialLoginData, setInitialLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState(initialLoginData);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userTypeData = localStorage.getItem("userType");
    setUserType(userTypeData);
  }, []);

  const handleLoginClick = async () => {
    const data = {
      email: loginData.email,
      password: loginData.password,
      role: [userType],
    };
    try {
      const response = await axios.post(LOG_IN_URL, data);
      alert("Login Successful");

      if (response?.data?.token) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("email", response?.data?.email);

        const rolesString = response.data.roles;
        const rolesArray = rolesString.replace(/[\[\]\s]/g, "").split(",");
        if (rolesArray[0] === "admin") {
          navigate(ADMIN_PROFILE);
        }else{
          navigate(USER_PROFILE);
        }
      }
    } catch (error) {
      alert("Login Failed");
      console.log("Error", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "0.8rem",
        my: "2rem",
      }}
    >
      <img src={SignInIcon} alt="Sign In Icon" size={"8rem"} />

      <ReusableTextField
        label={"Email : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setLoginData((prevDetails) => ({
            ...prevDetails,
            email: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            emailError: emailValidation(event.target.value),
          }));
        }}
        errorText={error.emailError}
      />
      <ReusablePasswordField
        label={"Password : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setLoginData((prevDetails) => ({
            ...prevDetails,
            password: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            passwordError: passwordValidation(event.target.value),
          }));
        }}
        errorText={error.passwordError}
      />

      <ReusableButton
        background={theme.palette.borderGreen}
        textColor={theme.palette.white}
        boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
        width="72%"
        height="2.85rem"
        borderRadius="0.5rem"
        fontSize="1.1rem"
        buttonText="Log in"
        fontWeight={600}
        my="1rem"
        onClick={handleLoginClick}
      />

      <Typography
        href="/forgot-password"
        sx={{
          fontWeight: 600,
          fontSize: "1.2rem",
          color: theme.palette.inputBorderYellow,
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Forgot password ?
      </Typography>

      <Box
        sx={{
          width: "50%",
          backgroundColor: "transparent",
          height: "2.5rem",
          my: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid" + theme.palette.borderGreen,
          borderRadius: "2rem",
          cursor: "pointer",
          gap: "2rem",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(5, 150, 105, 0.4)",
          },
        }}
      >
        <img
          src={GoogleIcon}
          alt="Sign In Icon"
          style={{ height: "2rem", width: "2rem" }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.red,
          }}
        >
          Login with google
        </Typography>
      </Box>
    </Box>
  );
};

const SignUpComponent = () => {
  const theme = useTheme();
  // const url =
  const [initialDetailsState, setDetailsState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [details, setDetails] = useState(initialDetailsState);
  const [userType, setUserType] = useState("");
  const [error, setError] = useState({
    nameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const [saveDisable, setSaveDisable] = useState(false);

  const handleSaveClick = async () => {
    const data = {
      name: details.name,
      username: details.username,
      email: details.email,
      password: details.password,
      roles: [userType],
    };
    try {
      const response = await axios.post(CREATE_USER_URL, data);
      alert("User created successfully !");
    } catch (error) {
      alert("Creation failed ", error);
    }
  };

  useEffect(() => {
    const isErrorPresent = Object.values(error).some(
      (errorMsg) => errorMsg !== ""
    );
    if (isErrorPresent) {
      setSaveDisable(true);
    } else {
      setSaveDisable(false);
    }
  }, [error]);

  useEffect(() => {
    const userTypeData = localStorage.getItem("userType");
    setUserType(userTypeData);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: "100%",
        display: "flex",
        alignItems: "center",
        my: "1rem",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <ReusableTextField
        label={"Name : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            name: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            nameError: nameValidation(event.target.value),
          }));
        }}
        errorText={error.nameError}
      />
      <ReusableTextField
        label={"Username : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            username: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            usernameError: usernameValidation(event.target.value),
          }));
        }}
        errorText={error.usernameError}
      />
      <ReusableTextField
        label={"Email : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            email: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            emailError: emailValidation(event.target.value),
          }));
        }}
        errorText={error.emailError}
      />
      <ReusablePasswordField
        label={"Password : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            password: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            passwordError: passwordValidation(event.target.value),
          }));
        }}
        errorText={error.passwordError}
      />
      <ReusablePasswordField
        label={"Confirm Password : "}
        borderColor={"1px solid " + theme.palette.inputBorderYellow}
        onChange={(event) => {
          setDetails((prevDetails) => ({
            ...prevDetails,
            confirmPassword: event.target.value,
          }));

          setError((prevError) => ({
            ...prevError,
            confirmPasswordError: confirmPasswordValidation(
              details.password,
              event.target.value
            ),
          }));
        }}
        errorText={error.confirmPasswordError}
      />

      <ReusableButton
        background={theme.palette.borderGreen}
        textColor={theme.palette.white}
        boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
        width="72%"
        height="2.85rem"
        borderRadius="0.5rem"
        fontSize="1.1rem"
        buttonText="Save"
        fontWeight={600}
        my="1rem"
        disabled={saveDisable}
        onClick={handleSaveClick}
      />

      <Box
        sx={{
          width: "50%",
          backgroundColor: "transparent",
          height: "2.5rem",
          my: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid" + theme.palette.borderGreen,
          borderRadius: "2rem",
          cursor: "pointer",
          gap: "2rem",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(5, 150, 105, 0.4)",
          },
        }}
      >
        <img
          src={GoogleIcon}
          alt="Sign In Icon"
          style={{ height: "2rem", width: "2rem" }}
        />

        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.red,
          }}
        >
          continue with google
        </Typography>
      </Box>
    </Box>
  );
};
const SignUpPage = () => {
  const theme = useTheme();
  const [buttonText, setButtonText] = useState("Sign in");

  const handleSignInOptionClick = () => {
    buttonText === "Sign in"
      ? setButtonText("Sign Up")
      : setButtonText("Sign in");
  };
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
          overflow: "visible",
        }}
      >
        <BlobWrapper />

        {/* Main Content */}
        <Paper
          sx={{
            zIndex: 5,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            background: "transparent",
          }}
        >
          <Grid
            container
            sx={{
              width: "70rem",
              height: "35rem",
              border: "0.3rem solid" + theme.palette.borderGreen,
              borderRadius: "0.5rem",
            }}
          >
            {/* Left side grid */}
            <Grid
              item
              gap={"1rem"}
              sx={{
                backgroundColor: "rgba(7, 163, 15, 0.8)",
                height: "100%",
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
              container
              flexDirection={"column"}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  color: "white",
                  fontWeight: 700,
                  my: "2rem",
                }}
              >
                Hello !
              </Typography>

              <ReusableButton
                background={theme.palette.inputBorderYellow}
                textColor="linear-gradient(to right, #059669, #0284c7)"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                transform="translateY(-2px)"
                boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
                width="8rem"
                height="2.85rem"
                borderRadius="0.5rem"
                fontSize="1.1rem"
                buttonText={buttonText}
                fontWeight={600}
                onClick={() => {
                  handleSignInOptionClick(buttonText);
                }}
              />

              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "rgb(163, 247, 205)",
                  fontWeight: 700,
                  my: "-0.8rem",
                }}
              >
                {buttonText === "Sign Up"
                  ? "Don't have account ?"
                  : "Already have account"}
              </Typography>
            </Grid>

            {/* Right side grid (SignUpComponent) */}
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60%",
              }}
            >
              {buttonText === "Sign Up" ? (
                <SignInComponent />
              ) : (
                <SignUpComponent />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default SignUpPage;
