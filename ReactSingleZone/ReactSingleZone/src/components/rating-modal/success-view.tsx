"use client"
import type React from "react"
import { Box, Typography } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

interface SuccessViewProps {
  rating: number
}

const SuccessView: React.FC<SuccessViewProps> = ({ rating }) => {
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, #0f0f0f, #001620)",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ccff, #0088cc)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#0f0f0f",
          mb: 2,
          boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)",
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": { transform: "scale(1)", boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)" },
            "50%": { transform: "scale(1.05)", boxShadow: "0 0 30px rgba(0, 204, 255, 0.6)" },
            "100%": { transform: "scale(1)", boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)" },
          },
        }}
      >
        <CheckCircleIcon fontSize="large" />
      </Box>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        mb={1}
        sx={{
          background: "linear-gradient(90deg, #ffffff, #00ccff)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Thank you for your feedback!
      </Typography>
      <Typography color="rgba(255,255,255,0.8)">
        Your rating has been successfully received.
        <br />
        We appreciate your time.
      </Typography>

      {/* Display the submitted rating */}
      <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>Your rating:</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              sx={{
                color: i < rating ? "#00ccff" : "rgba(255,255,255,0.2)",
                fontSize: "1.2rem",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SuccessView
