import { Box, Grid } from "@mui/material";

const BlobsBackground = () => {
  return (
    <Box position="relative" width="100%" height="100%" overflow="hidden">
      {/* Decorative Blobs */}
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "16rem",
          height: "16rem",
          backgroundColor: "#81C784",
          borderRadius: "50%",
          mixBlendMode: "multiply",
          filter: "blur(24px)",
          opacity: 0.3,
          animation: "pulse 2s infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "75%",
          right: "25%",
          width: "24rem",
          height: "24rem",
          bgcolor: "#B3E5FC",
          borderRadius: "50%",
          mixBlendMode: "multiply",
          filter: "blur(24px)",
          opacity: 0.3,
          animation: "pulse 2s infinite 1s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "33%",
          width: "20rem",
          height: "20rem",
          bgcolor: "#FFD180",
          borderRadius: "50%",
          mixBlendMode: "multiply",
          filter: "blur(24px)",
          opacity: 0.3,
          animation: "pulse 2s infinite 2s",
        }}
      />

      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.5;
            }
          }
        `}
      </style>
    </Box>
  );
};

const BlobWrapper = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <BlobsBackground />
    </Box>
  );
};

export default BlobWrapper;
