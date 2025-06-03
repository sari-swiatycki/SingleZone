"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Grid, ThemeProvider } from "@mui/material"
import { useNavigate } from "react-router-dom"
import PersonalAreaCard from "./personal-area-card"
import { darkTheme, cardData } from "./theme"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../Stores/songStore"

const PersonalAreaMenu = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(-1)
  const navigate = useNavigate()
  // const dispatch = useDispatch<AppDispatch>()
  const user = JSON.parse(sessionStorage.getItem("user") || "null")

  useEffect(() => {
    // Trigger the page load animation
    setIsLoaded(true)

    // Cycle through cards for initial animation
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => {
        if (prev >= 2) {
          clearInterval(interval)
          return -1
        }
        return prev + 1
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const handleNavigation = (cardId: string) => {
    switch (cardId) {
      case "upload":
        navigate("/personal-area/upload-song")
        break
      case "playlists":
        // Check if user exists before navigating
        if (user) {
          navigate("/personal-area/playlists/" + user.id)
        } else {
          // Optional: Show error or redirect to login
          console.error("User not found")
        }
        break
      case "profile":
        navigate("/personal-area/profile-update")
        break
      default:
        console.error("Invalid navigation")
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a1a 0%, #121212 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
          px: 2,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.08), transparent 70%)",
            pointerEvents: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.05), transparent 50%)",
            pointerEvents: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out 0.3s",
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              mb: 5,
              color: "white",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: `translateX(-50%) ${isLoaded ? "translateY(0)" : "translateY(-20px)"}`,
              opacity: isLoaded ? 1 : 0,
              transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "30%",
                width: isLoaded ? "40%" : "0%",
                height: 4,
                backgroundColor: "primary.main",
                borderRadius: 2,
                transition: "width 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s",
              },
            }}
          >
            Personal Area
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {cardData.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={card.id}
                sx={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ease ${0.3 + index * 0.15}s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.3 + index * 0.15}s`,
                }}
              >
                <PersonalAreaCard
                  card={card}
                  index={index}
                  hoveredCard={hoveredCard}
                  activeCardIndex={activeCardIndex}
                  isLoaded={isLoaded}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleNavigation(card.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PersonalAreaMenu
