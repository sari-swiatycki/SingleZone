"use client"
import type React from "react"
import { Box, Typography } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import MusicNoteIcon from "@mui/icons-material/MusicNote"

interface RatingStarsProps {
  rating: number
  hoveredRating: number
  onRatingChange: (rating: number) => void
  onMouseEnter: (index: number) => void
  onMouseLeave: () => void
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  hoveredRating,
  onRatingChange,
  onMouseEnter,
  onMouseLeave,
}) => {
  // Emojis and texts based on rating
  const emojis = ["😞", "😕", "😊", "😃", "🤩"]
  const ratingTexts = [
    "Sorry to hear that. Please tell us how we can improve.",
    "There's room for improvement. Thanks for your feedback.",
    "Thank you for the positive rating!",
    "Great! We're glad you enjoyed it.",
    "Perfect! We're thrilled you loved the song!",
  ]

  return (
    <>
      <Typography
        sx={{
          mb: 3,
          fontWeight: 500,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        How much did you enjoy this song?
      </Typography>

      {/* Stars for rating */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          my: 3,
        }}
      >
        {[1, 2, 3, 4, 5].map((index) => (
          <Box
            key={index}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={onMouseLeave}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 50,
                height: 50,
                borderRadius: "50%",
                background:
                  hoveredRating >= index || rating >= index
                    ? "radial-gradient(circle, rgba(0, 204, 255, 0.15) 0%, rgba(0, 204, 255, 0) 70%)"
                    : "transparent",
                boxShadow: hoveredRating >= index || rating >= index ? "0 0 15px rgba(0, 204, 255, 0.3)" : "none",
                opacity: hoveredRating >= index || rating >= index ? 1 : 0,
                transform: hoveredRating >= index || rating >= index ? "scale(1)" : "scale(0.7)",
                transition: "all 0.2s",
              }}
            />
            <StarIcon
              fontSize="large"
              sx={{
                color: hoveredRating >= index || rating >= index ? "#00ccff" : "rgba(255,255,255,0.3)",
                filter:
                  hoveredRating >= index || rating >= index ? "drop-shadow(0 0 3px rgba(0, 204, 255, 0.7))" : "none",
                zIndex: 2,
                transition: "all 0.2s",
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Emoji and text */}
      <Box sx={{ minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {rating > 0 && (
          <>
            <Typography
              sx={{
                fontSize: "2.5rem",
                mt: 1,
                mb: 1,
                animation: "fadeIn 0.3s",
              }}
            >
              {emojis[rating - 1]}
            </Typography>
            <Typography
              sx={{
                color: "#00ccff",
                fontWeight: 500,
                animation: "fadeIn 0.3s",
                textShadow: "0 0 10px rgba(0, 204, 255, 0.3)",
              }}
            >
              {ratingTexts[rating - 1]}
            </Typography>
          </>
        )}
      </Box>

      {/* Music notes animation */}
      {rating > 0 && (
        <Box sx={{ position: "relative", height: 40 }}>
          {[1, 2, 3, 4].map((i) => (
            <MusicNoteIcon
              key={i}
              sx={{
                position: "absolute",
                color: "#00ccff",
                opacity: 0.7,
                fontSize: 20,
                left: `${20 * i}%`,
                animation: `floatNote ${1 + i * 0.5}s ease-in-out infinite ${i * 0.2}s`,
                "@keyframes floatNote": {
                  "0%": { transform: "translateY(0) rotate(0deg)", opacity: 0 },
                  "50%": { opacity: 0.7 },
                  "100%": { transform: "translateY(-20px) rotate(10deg)", opacity: 0 },
                },
              }}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export default RatingStars
