"use client"

import React from "react"
import { Card, CardContent, Typography, Box, alpha } from "@mui/material"
import {
  CloudUpload as UploadIcon,
  Headphones as PlaylistIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material"

interface PersonalAreaCardProps {
  card: {
    id: string
    title: string
    description: string
    iconColor: string
    bgGradient: string
  }
  index: number
  hoveredCard: string | null
  activeCardIndex: number
  isLoaded: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

const PersonalAreaCard: React.FC<PersonalAreaCardProps> = ({
  card,
  index,
  hoveredCard,
  activeCardIndex,
  isLoaded,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const getIcon = (cardId: string) => {
    switch (cardId) {
      case "upload":
        return <UploadIcon sx={{ fontSize: 80 }} />
      case "playlists":
        return <PlaylistIcon sx={{ fontSize: 80 }} />
      case "profile":
        return <ProfileIcon sx={{ fontSize: 80 }} />
      default:
        return <UploadIcon sx={{ fontSize: 80 }} />
    }
  }

  const icon = getIcon(card.id)

  return (
    <Card
      onClick={onClick}
      sx={{
        background: card.bgGradient,
        height: 320,
        transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        transform: hoveredCard === card.id || activeCardIndex === index ? "translateY(-12px)" : "translateY(0)",
        boxShadow:
          hoveredCard === card.id || activeCardIndex === index
            ? `0 20px 30px rgba(0,0,0,0.3), 0 0 0 2px ${alpha("#22d3ee", 0.3)}`
            : "0 10px 20px rgba(0,0,0,0.2)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-12px)",
          boxShadow: `0 20px 30px rgba(0,0,0,0.3), 0 0 0 2px ${alpha("#22d3ee", 0.3)}`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            hoveredCard === card.id || activeCardIndex === index
              ? `radial-gradient(circle at center, ${alpha("#22d3ee", 0.1)} 0%, transparent 70%)`
              : "transparent",
          opacity: 0.7,
          transition: "all 0.3s ease",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-100%",
          left: "-100%",
          width: "120%",
          height: "120%",
          background: `linear-gradient(225deg, transparent 30%, ${alpha("#22d3ee", 0.1)} 50%, transparent 70%)`,
          opacity: hoveredCard === card.id ? 1 : 0,
          transition: "all 0.8s ease",
          transform: "rotate(45deg)",
          animation: hoveredCard === card.id ? "shine 2s infinite" : "none",
          "@keyframes shine": {
            from: {
              top: "-100%",
              left: "-100%",
            },
            to: {
              top: "100%",
              left: "100%",
            },
          },
          zIndex: 0,
        },
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          p: 4,
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            background: alpha(card.iconColor, 0.1),
            border: `1px solid ${alpha(card.iconColor, 0.2)}`,
            transition: "all 0.3s ease",
            transform: hoveredCard === card.id || activeCardIndex === index ? "scale(1.05)" : "scale(1)",
            boxShadow:
              hoveredCard === card.id || activeCardIndex === index ? `0 0 20px ${alpha(card.iconColor, 0.3)}` : "none",
            animation: hoveredCard === card.id ? "pulse 2s infinite" : "none",
            "@keyframes pulse": {
              "0%": {
                boxShadow: `0 0 0 0 ${alpha(card.iconColor, 0.4)}`,
              },
              "70%": {
                boxShadow: `0 0 0 10px ${alpha(card.iconColor, 0)}`,
              },
              "100%": {
                boxShadow: `0 0 0 0 ${alpha(card.iconColor, 0)}`,
              },
            },
          }}
        >
          {React.cloneElement(icon, {
            sx: {
              fontSize: 64,
              color: card.iconColor,
              transition: "all 0.3s ease",
              transform:
                hoveredCard === card.id || activeCardIndex === index
                  ? "scale(1.1) rotate(5deg)"
                  : "scale(1) rotate(0deg)",
              animation: hoveredCard === card.id ? "float 3s ease-in-out infinite" : "none",
              "@keyframes float": {
                "0%": {
                  transform: "scale(1.1) translateY(0px) rotate(0deg)",
                },
                "50%": {
                  transform: "scale(1.15) translateY(-5px) rotate(5deg)",
                },
                "100%": {
                  transform: "scale(1.1) translateY(0px) rotate(0deg)",
                },
              },
            },
          })}
        </Box>
        <Typography
          variant="h4"
          sx={{
            mb: 1.5,
            color: "white",
            transition: "all 0.3s ease",
            transform: hoveredCard === card.id || activeCardIndex === index ? "translateY(-4px)" : "translateY(0)",
            textShadow:
              hoveredCard === card.id || activeCardIndex === index ? "0 0 8px rgba(34, 211, 238, 0.3)" : "none",
          }}
        >
          {card.title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: alpha("#ffffff", 0.7),
            transition: "all 0.3s ease",
            transform: hoveredCard === card.id || activeCardIndex === index ? "translateY(-2px)" : "translateY(0)",
            opacity: hoveredCard === card.id || activeCardIndex === index ? 1 : 0.7,
          }}
        >
          {card.description}
        </Typography>

        {/* Animated indicator line */}
        <Box
          sx={{
            position: "absolute",
            bottom: 24,
            width: hoveredCard === card.id || activeCardIndex === index ? 60 : 40,
            height: 3,
            backgroundColor: card.iconColor,
            borderRadius: 4,
            transition: "all 0.3s ease",
            opacity: hoveredCard === card.id || activeCardIndex === index ? 1 : 0.6,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: card.iconColor,
              borderRadius: 4,
              filter: "blur(3px)",
              opacity: hoveredCard === card.id ? 0.6 : 0,
              transition: "opacity 0.3s ease",
            },
          }}
        />
      </CardContent>
    </Card>
  )
}

export default PersonalAreaCard
