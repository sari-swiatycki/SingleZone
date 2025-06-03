"use client"

import type React from "react"

import { Box, Typography } from "@mui/material"
import { useTypingAnimation } from "./hooks/useTypingAnimation"

interface TypingAnimationProps {
  text: string
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const typedText = useTypingAnimation(text)

  return (
    <Typography
      variant="body1"
      sx={{
        maxWidth: 320,
        zIndex: 1,
        lineHeight: 1.5,
        color: "#cccccc",
        minHeight: "3em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.95rem",
      }}
    >
      {typedText}
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: "2px",
          height: "1.2em",
          backgroundColor: "#00bcd4",
          ml: 1,
          animation: "blink 1s infinite",
          "@keyframes blink": {
            "0%, 50%": { opacity: 1 },
            "51%, 100%": { opacity: 0 },
          },
        }}
      />
    </Typography>
  )
}
