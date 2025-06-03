"use client"

import type React from "react"
import { Box, Typography, IconButton, Slide, styled } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeMuteIcon from "@mui/icons-material/VolumeMute"

const PlayerBarContainer = styled(Box)(({}) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(0, 0, 0, 0.9)",
  borderTop: "1px solid rgba(0, 206, 209, 0.3)",
  padding: "12px 24px",
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  color: "#fff",
}))

const Visualizer = styled(Box)(({}) => ({
  width: "100%",
  height: 60,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: 3,
  padding: "0 24px 8px 24px",
}))

const VisualizerBar = styled(Box)<{ height: number }>(({ height }) => ({
  width: 5,
  height: `${height}%`,
  background: "rgb(0, 206, 209)",
  borderRadius: "2px 2px 0 0",
  transition: "height 0.1s ease-in-out",
}))

interface Song {
  id: number
  title: string
  artist: string
  audioUrl: string
  duration?: number
}

interface PlayerBarProps {
  showPlayer: boolean
  playingIndex: number | null
  playlistSongs: Song[]
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  visualizerData: number[]
  onPlayPrevious: () => void
  onTogglePlayPause: () => void
  onPlayNext: () => void
  onToggleMute: () => void
  onVolumeChange: (e: React.MouseEvent<HTMLDivElement>) => void
  onProgressBarClick: (e: React.MouseEvent<HTMLDivElement>) => void
  formatTime: (seconds: number) => string
}

const PlayerBar: React.FC<PlayerBarProps> = ({
  showPlayer,
  playingIndex,
  playlistSongs,
  isPlaying,
  currentTime,
  duration,
  volume,
  muted,
  visualizerData,
  onPlayPrevious,
  onTogglePlayPause,
  onPlayNext,
  onToggleMute,
  onVolumeChange,
  onProgressBarClick,
  formatTime,
}) => {
  return (
    <Slide direction="up" in={showPlayer} mountOnEnter unmountOnExit>
      <PlayerBarContainer>
        {/* ויזואליזציה */}
        <Visualizer>
          {visualizerData.map((height, i) => (
            <VisualizerBar key={i} height={height} />
          ))}
        </Visualizer>

        {/* פרטי השיר המתנגן */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {playingIndex !== null && (
              <>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                  {playlistSongs[playingIndex]?.title}
                </Typography>
                <Typography variant="body2" noWrap sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {playlistSongs[playingIndex]?.artist}
                </Typography>
              </>
            )}
          </Box>

          {/* כפתורי שליטה */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton
              onClick={onPlayPrevious}
              disabled={playingIndex === 0 || playingIndex === null}
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              <SkipPreviousIcon />
            </IconButton>

            <IconButton
              onClick={onTogglePlayPause}
              sx={{
                color: "rgb(0, 206, 209)",
                backgroundColor: "rgba(0, 206, 209, 0.1)",
                padding: "12px",
                "&:hover": {
                  backgroundColor: "rgba(0, 206, 209, 0.2)",
                },
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton
              onClick={onPlayNext}
              disabled={playingIndex === null || playingIndex === playlistSongs.length - 1}
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              <SkipNextIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", mr: 2, ml: 2 }}>
              <IconButton onClick={onToggleMute} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
              </IconButton>

              <Box
                sx={{
                  width: 60,
                  height: 4,
                  background: "#333",
                  borderRadius: 2,
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={onVolumeChange}
              >
                <Box
                  sx={{
                    position: "absolute",
                    height: "100%",
                    width: `${volume * 100}%`,
                    background: "rgb(0, 206, 209)",
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* סרגל התקדמות */}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
          <Typography variant="caption">{formatTime(currentTime)}</Typography>

          <Box
            sx={{
              flex: 1,
              height: 4,
              background: "#333",
              borderRadius: 2,
              cursor: "pointer",
              position: "relative",
            }}
            onClick={onProgressBarClick}
          >
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: `${(currentTime / duration) * 100 || 0}%`,
                background: "rgb(0, 206, 209)",
                borderRadius: 2,
              }}
            />
          </Box>

          <Typography variant="caption">{formatTime(duration)}</Typography>
        </Box>
      </PlayerBarContainer>
    </Slide>
  )
}

export default PlayerBar
