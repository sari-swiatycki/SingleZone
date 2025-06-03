"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Box, Typography, Button, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import HeadphonesIcon from "@mui/icons-material/Headphones"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../Stores/songStore"
import { addRating } from "../../Slices/actionSongSlice"
import RatingStars from "./rating-stars"
import SuccessView from "./success-view"

interface RatingModalProps {
  open: boolean
  onClose: () => void
  songId: number
  songTitle: string
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, songId, songTitle }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setRating(0)
      setHoveredRating(0)
      setIsSubmitted(false)
    }
  }, [open])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmitRating = async () => {
    // Send rating to server
    await dispatch(addRating({ songId, value: rating }))

    // Update local state immediately for UI refresh
    // This ensures the rating is visible immediately without needing to search again

    console.log(`Submitting rating ${rating} for song ID ${songId}`)
    setIsSubmitted(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      handleReset()
      onClose()
    }, 2000)
  }

  const handleReset = () => {
    setRating(0)
    setHoveredRating(0)
    setIsSubmitted(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isSubmitted) {
          handleReset()
          onClose()
        }
      }}
      aria-labelledby="rating-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 450 },
          maxWidth: "95vw",
          bgcolor: "#0f0f0f",
          color: "white",
          borderRadius: 2,
          boxShadow: "0 10px 40px rgba(0, 204, 255, 0.25)",
          overflow: "hidden",
          border: "1px solid rgba(0, 204, 255, 0.1)",
          animation: "fadeIn 0.5s ease-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translate(-50%, -45%)" },
            to: { opacity: 1, transform: "translate(-50%, -50%)" },
          },
        }}
      >
        {isSubmitted ? (
          <SuccessView rating={rating} />
        ) : (
          <>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(to bottom, #0f0f0f, #001620)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(0, 204, 255, 0.1)",
              }}
            >
              <IconButton
                onClick={() => {
                  handleReset()
                  onClose()
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": {
                    color: "#00ccff",
                    background: "rgba(0, 204, 255, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Ambient glow effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle at 50% 10%, rgba(0, 204, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                  zIndex: 0,
                }}
              />

              {/* Ripple effect */}
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 204, 255, 0.1)",
                    width: i === 1 ? 200 : i === 2 ? 150 : 100,
                    height: i === 1 ? 200 : i === 2 ? 150 : 100,
                    right: i === 1 ? -100 : i === 2 ? 50 : "auto",
                    left: i === 3 ? -50 : "auto",
                    top: i === 1 ? -100 : i === 3 ? 10 : "auto",
                    bottom: i === 2 ? -70 : "auto",
                    animation: `ripple 3s linear infinite ${0.5 * (i - 1)}s`,
                    "@keyframes ripple": {
                      "0%": { transform: "scale(0.8)", opacity: 0.5 },
                      "100%": { transform: "scale(1.5)", opacity: 0 },
                    },
                  }}
                />
              ))}

              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <HeadphonesIcon
                    sx={{
                      fontSize: 40,
                      color: "#00ccff",
                      filter: "drop-shadow(0 0 8px rgba(0, 204, 255, 0.5))",
                    }}
                  />
                </Box>

                {/* Equalizer effect */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "3px",
                    height: 20,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {[...Array(9)].map((_, i) => {
                    const barHeight = Math.floor(Math.random() * 15) + 5
                    const animationDuration = (Math.random() * 0.8 + 0.5).toFixed(1)

                    return (
                      <Box
                        key={i}
                        sx={{
                          width: "3px",
                          height: `${barHeight}px`,
                          backgroundColor: "#00ccff",
                          borderRadius: "1px",
                          animation: `equalizer ${animationDuration}s ease-in-out infinite alternate`,
                          "@keyframes equalizer": {
                            "0%": { height: `${barHeight}px` },
                            "100%": { height: `${Math.floor(Math.random() * 20) + 5}px` },
                          },
                        }}
                      />
                    )
                  })}
                </Box>

                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="600"
                  textAlign="center"
                  sx={{
                    fontSize: "1.4rem",
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 10px rgba(0, 204, 255, 0.3)",
                  }}
                >
                  Rate This Song
                </Typography>
                <Typography
                  textAlign="center"
                  fontSize="0.95rem"
                  mt={1}
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    maxWidth: "90%",
                    margin: "8px auto 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {songTitle}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                background: "linear-gradient(to top, #0f0f0f, #001620)",
              }}
            >
              <RatingStars
                rating={rating}
                hoveredRating={hoveredRating}
                onRatingChange={handleRatingChange}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleReset()
                    onClose()
                  }}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    py: 1,
                    color: "rgba(255,255,255,0.8)",
                    borderColor: "rgba(255,255,255,0.15)",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    py: 1,
                    background: "linear-gradient(90deg, #00ccff, #0088cc)",
                    boxShadow: "0 4px 12px rgba(0, 204, 255, 0.3)",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(90deg, #00d8ff, #0099dd)",
                      boxShadow: "0 6px 15px rgba(0, 204, 255, 0.4)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(90deg, #004455, #006677)",
                      boxShadow: "none",
                      opacity: 0.5,
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Submit Rating
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default RatingModal
