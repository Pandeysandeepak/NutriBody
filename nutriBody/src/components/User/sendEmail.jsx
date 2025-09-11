import { Grid, CssBaseline, useTheme } from "@mui/material";
import DashboardMenubar from "../../Atoms/dashboardMenubar";
import ReusableButton from "../../Atoms/ReusableButton";
import { useEffect, useState } from "react";
import { Email } from "@mui/icons-material";
import axios from "axios";
import { SEND_EMAIL_URL } from "../constants";

const SendEmail = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const email_ = localStorage.getItem("email");
    const token_ = localStorage.getItem("token");
    setEmail(email_);
    setToken(token_);
  }, []);

  const handleSendEmail = async () => {
    const data = {
      to: email,
      subject: "Activate Your Diet Assistant Bot",
      // telegramLink: "https://t.me/YourBotUsername",

      htmlContent: `<a href="https://t.me/Nutrienginebot" style="text-decoration: none;">
  <button style="padding: 10px 20px; font-size: 16px; background-color: #2AABEE; color: white; border: none; border-radius: 5px;">
    Open Telegram
  </button>
</a>`,
    };

    try {
      const response = await axios.post(SEND_EMAIL_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        alert("Emai; sent successfully");
      }
    } catch (error) {
      alert("Problem is sending email");
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container sx={{ height: "100vh" }}>
        {/* Sidebar */}
        <Grid item sx={{ width: "15%" }}>
          <DashboardMenubar />
        </Grid>

        {/* Main Form Section */}
        <Grid item sx={{ width: "85%", p: "1rem" }}>
          <ReusableButton
            background={theme.palette.borderGreen}
            textColor={theme.palette.white}
            boxShadow="0 12px 36px rgba(5, 150, 105, 0.4)"
            width="20%"
            height="2.85rem"
            borderRadius="0.5rem"
            fontSize="1.1rem"
            buttonText="Send Email"
            fontWeight={600}
            my="1rem"
            onClick={handleSendEmail}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SendEmail;
