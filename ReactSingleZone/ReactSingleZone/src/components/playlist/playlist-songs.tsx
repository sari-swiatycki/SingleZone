"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "../../Stores/songStore"
import { fetchPlaylistSongs } from "../../Slices/playlistSlice"
import { useParams } from "react-router-dom"
import { Box, Button, Typography, Modal, Stack, Fade, CircularProgress, styled } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import QueueMusicIcon from "@mui/icons-material/QueueMusic"
import SongListForPlaylist from "../SongListForPlaylistProps"
import PlayerBar from "./player-bar"
import SongsList from "./songs-list"

// סטיילינג מותאם אישית
const StyledPaper = styled("div")(({}) => ({
  background: "#111",
  color: "#fff",
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 206, 209, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 12px 48px rgba(0, 206, 209, 0.2)",
  },
}))

const TurquoiseButton = styled(Button)(({}) => ({
  background: "rgba(0, 206, 209, 0.9)",
  color: "#000",
  fontWeight: "bold",
  borderRadius: 8,
  padding: "10px 24px",
  "&:hover": {
    background: "rgba(0, 206, 209, 1)",
  },
}))

const ModalContent = styled(Box)(({}) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "80vh",
  overflow: "auto",
  background: "#111",
  color: "#fff",
  borderRadius: 16,
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5)",
  padding: 24,
  border: "1px solid rgba(0, 206, 209, 0.3)",
}))

// ממשק לשיר
interface Song {
  id: number
  title: string
  artist: string
  audioUrl: string
  duration?: number
}

const PlaylistSongs: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { playlistSongs, loading } = useSelector((state: RootStore) => state.playlists)
  const [showSongList, setShowSongList] = useState<boolean>(false)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [playingAll, setPlayingAll] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)
  const [muted, setMuted] = useState<boolean>(false)
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(30).fill(10))
  const [showPlayer, setShowPlayer] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistSongs(Number(id)))
    }
  }, [dispatch, id])

  // פונקציה פשוטה לויזואליזציה
  const startSimpleVisualizer = () => {
    const updateVisualizer = () => {
      if (isPlaying) {
        const newData = Array(30)
          .fill(0)
          .map(() => Math.max(10, Math.random() * 80 + 20))
        setVisualizerData(newData)
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer)
    }
    updateVisualizer()
  }

  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setVisualizerData(Array(30).fill(10))
  }

  useEffect(() => {
    if (isPlaying) {
      startSimpleVisualizer()
    } else {
      stopVisualizer()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  // הגדרת ווליום לכל השירים
  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.volume = muted ? 0 : volume
      }
    })
  }, [volume, muted])

  // עדכון נראות הנגן
  useEffect(() => {
    setShowPlayer(playingIndex !== null)
  }, [playingIndex])

  const playSong = (index: number) => {
    console.log(`🎵 Trying to play song at index ${index}`)

    // עצירת השיר הנוכחי אם יש
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex]?.pause()
      setIsPlaying(false)
    }

    // אם זה אותו שיר - עצור
    if (index === playingIndex) {
      setPlayingIndex(null)
      setShowPlayer(false)
      setIsPlaying(false)
      return
    }

    // בדיקה שהאלמנט קיים
    const audioElement = audioRefs.current[index]
    if (!audioElement) {
      console.error(`❌ No audio element at index ${index}`)
      return
    }

    console.log(`✅ Audio element found, src: ${audioElement.src}`)

    // הפעלת השיר החדש
    setPlayingIndex(index)
    setShowPlayer(true)
    setPlayingAll(false)

    audioElement
      .play()
      .then(() => {
        console.log(`✅ Successfully playing song ${index}`)
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error(`❌ Error playing song ${index}:`, error)
        setIsPlaying(false)
      })
  }

  const playAllSongs = () => {
    if (playlistSongs.length === 0) return

    if (playingAll) {
      // עצירת כל השירים
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex]?.pause()
      }
      setPlayingIndex(null)
      setPlayingAll(false)
      setShowPlayer(false)
      setIsPlaying(false)
    } else {
      // התחלת ניגון מהשיר הראשון
      const firstAudio = audioRefs.current[0]
      if (!firstAudio) {
        console.error("❌ No first audio element")
        return
      }

      setPlayingIndex(0)
      setPlayingAll(true)
      setShowPlayer(true)

      firstAudio
        .play()
        .then(() => {
          console.log("✅ Successfully started playing all songs")
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error("❌ Error playing first song:", error)
          setIsPlaying(false)
        })
    }
  }

  const playNext = () => {
    if (playingIndex !== null && playingIndex < playlistSongs.length - 1) {
      const nextIndex = playingIndex + 1
      playSong(nextIndex)
    }
  }

  const playPrevious = () => {
    if (playingIndex !== null && playingIndex > 0) {
      const prevIndex = playingIndex - 1
      playSong(prevIndex)
    }
  }

  const togglePlayPause = () => {
    if (playingIndex === null) return

    const currentAudio = audioRefs.current[playingIndex]
    if (!currentAudio) return

    if (currentAudio.paused) {
      currentAudio
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Error resuming playback:", error))
    } else {
      currentAudio.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playingIndex === null) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPositionRatio = (e.clientX - rect.left) / rect.width

    const audio = audioRefs.current[playingIndex]
    if (audio && audio.duration) {
      audio.currentTime = audio.duration * clickPositionRatio
    }
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget
    const rect = volumeBar.getBoundingClientRect()
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const formatTime = (seconds: number): string => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  // Event handlers for audio elements
  const handleTimeUpdate = (index: number) => (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget
    if (playingIndex === index) {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }
  }

  const handleEnded = (index: number) => () => {
    console.log(`🏁 Song ${index} ended`)
    if (playingAll && index < playlistSongs.length - 1) {
      const nextIndex = index + 1
      playSong(nextIndex)
    } else {
      setPlayingIndex(null)
      setPlayingAll(false)
      setShowPlayer(false)
      setIsPlaying(false)
    }
  }

  const handlePlay = (index: number) => () => {
    if (playingIndex === index) {
      setIsPlaying(true)
    }
  }

  const handlePause = (index: number) => () => {
    if (playingIndex === index) {
      setIsPlaying(false)
    }
  }

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress sx={{ color: "rgb(0, 206, 209)" }} />
      </Box>
    )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 3,
        paddingBottom: showPlayer ? 16 : 3,
        background: "#000",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          marginBottom: 4,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 0 10px rgba(0, 206, 209, 0.5)",
        }}
      >
        <QueueMusicIcon sx={{ margin: "30px", mr: 1, color: "rgb(0, 206, 209)" }} />
        my playlists
      </Typography>

      {playlistSongs.length > 0 ? (
        <StyledPaper style={{ width: "100%", maxWidth: 700, marginBottom: 32 }}>
          <SongsList
            songs={playlistSongs}
            playingIndex={playingIndex}
            isPlaying={isPlaying}
            onPlaySong={playSong}
            audioRefs={audioRefs}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPlay={handlePlay}
            onPause={handlePause}
            playlistId={Number(id)}
          />
        </StyledPaper>
      ) : (
        <StyledPaper style={{ padding: 32, textAlign: "center", marginBottom: 32 }}>
          <MusicNoteIcon sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            no songs is in the playlist
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", mt: 1 }}>
            add songs to start listening
          </Typography>
        </StyledPaper>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TurquoiseButton
          onClick={playAllSongs}
          variant="contained"
          startIcon={playingAll ? <PauseIcon /> : <PlayArrowIcon />}
          disabled={playlistSongs.length === 0}
        >
          {playingAll ? "stop" : "play all songs"}
        </TurquoiseButton>

        <TurquoiseButton onClick={() => setShowSongList(true)} variant="contained" startIcon={<PlaylistAddIcon />}>
          add songs to the playlist
        </TurquoiseButton>
      </Stack>

      <PlayerBar
        showPlayer={showPlayer}
        playingIndex={playingIndex}
        playlistSongs={playlistSongs}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        muted={muted}
        visualizerData={visualizerData}
        onPlayPrevious={playPrevious}
        onTogglePlayPause={togglePlayPause}
        onPlayNext={playNext}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onProgressBarClick={handleProgressBarClick}
        formatTime={formatTime}
      />

      <Modal open={showSongList} onClose={() => setShowSongList(false)} closeAfterTransition>
        <Fade in={showSongList}>
          <ModalContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              <PlaylistAddIcon sx={{ verticalAlign: "middle", mr: 1, color: "rgb(0, 206, 209)" }} />
              ADD SONGS
            </Typography>
            <SongListForPlaylist playlistId={Number(id)} onClose={() => setShowSongList(false)} />
          </ModalContent>
        </Fade>
      </Modal>
    </Box>
  )
}

export default PlaylistSongs
