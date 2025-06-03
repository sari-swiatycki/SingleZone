"use client"

import React from "react"
import { List, ListItem, Divider, Box, Typography, IconButton, styled } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import RemoveSongButton from "../RemoveSongButtonProps "

const StyledListItem = styled(ListItem)(({}) => ({
  borderLeft: "3px solid transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    borderLeft: "3px solid rgb(0, 206, 209)",
    background: "rgba(255, 255, 255, 0.03)",
  },
}))

interface Song {
  id: number
  title: string
  artist: string
  audioUrl: string
  duration?: number
}

interface SongsListProps {
  songs: Song[]
  playingIndex: number | null
  isPlaying: boolean
  onPlaySong: (index: number) => void
  audioRefs: React.MutableRefObject<(HTMLAudioElement | null)[]>
  onTimeUpdate: (index: number) => (e: React.SyntheticEvent<HTMLAudioElement>) => void
  onEnded: (index: number) => () => void
  onPlay: (index: number) => () => void
  onPause: (index: number) => () => void
  playlistId: number
}

const SongsList: React.FC<SongsListProps> = ({
  songs,
  playingIndex,
  isPlaying,
  onPlaySong,
  audioRefs,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
  playlistId,
}) => {
  return (
    <List sx={{ width: "100%", padding: 0 }}>
      {songs.map((song: Song, index: number) => (
        <React.Fragment key={song.id}>
          <StyledListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              p: 2,
              backgroundColor: playingIndex === index ? "rgba(0, 206, 209, 0.05)" : "transparent",
            }}
          >
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => onPlaySong(index)}
                  sx={{
                    color: "rgb(0, 206, 209)",
                    mr: 1,
                    backgroundColor: "rgba(0, 206, 209, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 206, 209, 0.2)",
                    },
                  }}
                >
                  {playingIndex === index && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {song.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {song.artist}
                  </Typography>
                </Box>
              </Box>

              <RemoveSongButton playlistId={playlistId} songId={song.id} />
            </Box>

            <audio
              ref={(el) => {
                audioRefs.current[index] = el
                if (el) {
                  console.log(`🎧 Audio ref set for index ${index}`)
                }
              }}
              src={song.audioUrl}
              preload="metadata"
              onTimeUpdate={onTimeUpdate(index)}
              onEnded={onEnded(index)}
              onPlay={onPlay(index)}
              onPause={onPause(index)}
              style={{ display: "none" }}
            />
          </StyledListItem>
          {index < songs.length - 1 && <Divider sx={{ background: "rgba(255, 255, 255, 0.05)" }} />}
        </React.Fragment>
      ))}
    </List>
  )
}

export default SongsList
