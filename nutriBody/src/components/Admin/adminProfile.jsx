import { CssBaseline, Grid, Typography, useTheme, Box } from "@mui/material";
import ReusableTextField from "../../Atoms/ReusableInputField";
import ReusableButton from "../../Atoms/ReusableButton";
import DashboardMenubar from "../../Atoms/dashboardMenubar";
import defaultProfile from "../../Assets/defaultProfile.png";
import { useState, useRef, useEffect } from "react";
import {
  ADMIN_SAVE_PROFILE,
  UPLOAD_PROFILE_PICTURE_URL,
  GET_PROFILE_PICTURE_URL,
} from "../constants";
import axios, { Axios } from "axios";
import ReusableField from "../../Atoms/ReusableField";
import { data } from "autoprefixer";
import DietPlanTabs from "../dietPlan";
// Save functionality is left to implement

const AdminProfile = () => {
  const theme = useTheme();
  const [preview, setPreview] = useState(defaultProfile);
  const fileInputRef = useRef();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [defaultDataState, setDefaultDataState] = useState({
    username: "",
    name: "",
    email: "",
    gender: "",
    phone: "",
    city: "",
    state: "",
    experience: "",
    qualification: "",
  });
  const [data, setData] = useState(defaultDataState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setToken(token);
    setEmail(email);
    if(token && email){
      getProfilePicture(token,email)
    }
  }, []);

  const getProfilePicture = async (token, email) => {
    const data = {
      email: email
    }
    try {
      const response = await axios.get(`${GET_PROFILE_PICTURE_URL}?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setProfilePic(response?.data?.url);
      }

    } catch (error) {
      console.log("Profile picture not found", error.message);
    }
  };

  const handleProfileCilck = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", email);

      try {
        const response = await axios.post(
          UPLOAD_PROFILE_PICTURE_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfilePic(response.data.url);
        console.log("Upload successful:", response.data);
        alert("Upload successful");
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed");
      }
    }
  };

  const handleDataChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSaveClick = async () => {
    const payload = {
      username: data.username,
      fullName: data.name,
      email: data.email,
      gender: data.gender,
      city: data.city,
      state: data.state,
      yearsOfExperience: data.experience,
      highestQualification: data.qualification,
      phone: data.phone,
    };

    try {
      const response = await axios.post(ADMIN_SAVE_PROFILE, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        alert("Profile saved successfully");
        console.log("gender", response?.data?.["created user"]?.gender);

        localStorage.setItem(
          "gender",
          response?.data?.["created user"]?.gender
        );
      }
    } catch (error) {
      alert("error in  saving profile");
      console.log("Error ", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item sx={{ width: "15%" }}>
          <DashboardMenubar />
        </Grid>

        {/* Main wrapper */}
        <Grid item sx={{ width: "85%", p: "1rem",maxHeight:"100vh" ,overflow: "scroll" }}>
          {/* First section */}
          <Grid
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1.5rem",
                color: theme.palette.borderGreen,
              }}
            >
              Admin Profile
            </Typography>

            <Box
              onClick={handleProfileCilck}
              sx={{
                height: "7rem",
                width: "7rem",
                border: "4px solid green",
                borderRadius: "50%",
                display: "flex",
                alignSelf: "center",
                my: "1rem",
                overflow: "hidden",
                p: "1rem",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src={profilePic ? profilePic : defaultProfile}
                alt="Profile Picture"
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              🧑‍💼 Personal Information
            </Typography>
            <Grid
              sx={{ width: "100%", display: "flex", gap: "10rem", my: "1rem" }}
            >
              <ReusableField
                label={"Username :"}
                onChange={(e) => {
                  handleDataChange("username", e.target.value);
                }}
              />
              <ReusableField
                label={"Name :"}
                onChange={(e) => {
                  handleDataChange("name", e.target.value);
                }}
              />
            </Grid>
            <Grid
              sx={{ width: "100%", display: "flex", gap: "10rem", mb: "1rem" }}
            >
              <ReusableField
                label={"Gender :"}
                onChange={(e) => {
                  handleDataChange("gender", e.target.value);
                }}
              />
              <ReusableField
                label={"Email :"}
                onChange={(e) => {
                  handleDataChange("email", e.target.value);
                }}
              />
            </Grid>
            <Grid sx={{ width: "100%", display: "flex", gap: "10rem" }}>
              <ReusableField
                label={"Phone :"}
                onChange={(e) => {
                  handleDataChange("phone", e.target.value);
                }}
              />
            </Grid>
          </Grid>

          {/* Second Section */}

          <Grid
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              my: "1.6rem",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              📍 Location Information
            </Typography>

            <Grid
              sx={{ width: "100%", display: "flex", gap: "10rem", mt: "2rem" }}
            >
              <ReusableField
                label={"City :"}
                onChange={(e) => {
                  handleDataChange("city", e.target.value);
                }}
              />
              <ReusableField
                label={"State :"}
                onChange={(e) => {
                  handleDataChange("state", e.target.value);
                }}
              />
            </Grid>
          </Grid>

          {/* Third Section */}

          <Grid
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              py: "2rem",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
              🎓 Professional / Career Information
            </Typography>

            <Grid
              sx={{ width: "100%", display: "flex", gap: "10rem", my: "2rem" }}
            >
              <ReusableField
                label={"Years of Experience :"}
                onChange={(e) => {
                  handleDataChange("experience", e.target.value);
                }}
              />
              <ReusableField
                label={"Highest Qualification :"}
                onChange={(e) => {
                  handleDataChange("qualification", e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
              onClick={handleSaveClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminProfile;
