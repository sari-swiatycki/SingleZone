"use client"

import type React from "react"
import { Grid, Box, Button, Typography } from "@mui/material"
import { TypingAnimation } from "./TypingAnimation"

interface WelcomeSectionProps {
  navigate: (path: string) => void
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ navigate }) => {
  const fullText = "Welcome back to your musical journey. Sign in to access your personalized playlists."

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 70%, #003d4d 100%)",
        color: "white",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 188, 212, 0.03) 0%, transparent 50%)
          `,
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      {/* Logo */}
      <Box
        sx={{
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "linear-gradient(45deg, #1a1a1a, #333333)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
          border: "2px solid #333",
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
          },
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#00bcd4">
          S
        </Typography>
      </Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          zIndex: 1,
          color: "#ffffff",
          mb: 2,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        SoundWave
      </Typography>

      {/* Continuous Typing Animation */}
      <TypingAnimation text={fullText} />

      <Box sx={{ mt: 3, zIndex: 1 }}>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1.5, fontSize: "0.85rem" }}>
          Don't have an account?
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: "#333",
            color: "#cccccc",
            px: 2.5,
            py: 0.8,
            fontSize: "0.85rem",
            "&:hover": {
              borderColor: "#00bcd4",
              color: "#00bcd4",
              backgroundColor: "rgba(0, 188, 212, 0.1)",
            },
          }}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </Grid>
  )
}
