"use client"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { Box, Container, Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"


// import Header from "./Header";



import HeadphonesIcon from "@mui/icons-material/Headphones"
import FeaturedReleases from "./FeaturedReleases"
import FeaturesSection from "./FeaturesSection"
import { styled } from "@mui/system"
import {  AppDispatch, RootStore } from "../../Stores/songStore"
import { parseBlob } from "music-metadata-browser"
import { fetchAllSongs } from "../../Slices/actionSongSlice"
import SearchBar from "../SearchBar"
import SongsList from "../SongsList"
import CategoryList from "../CategoryList"
import { motion } from "framer-motion"

// Styled components
const HeroSection = styled(Box)(() => ({
  background: "linear-gradient(180deg, #000000 0%, #121212 100%)",
  padding: "80px 0 40px 0",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 60%)",
    zIndex: 0,
  },
}))

const DiscoverButton = styled(Button)(() => ({
  backgroundColor: "#00BCD4",
  color: "white",
  borderRadius: 50,
  padding: "10px 20px",
  fontWeight: "bold",
  marginTop: 20,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#26C6DA",
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(0, 188, 212, 0.4)",
  },
}))

const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover"

// Array of taglines for the rotating text
const taglines = [
  "Discover Music Without Limits",
  "Your Sound, Your World",
  "Unleash Your Musical Journey",
  "Every Beat Matters",
  "Music That Moves You",
]

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { songs } = useSelector((state: RootStore) => state.actionSongs)
  const [coverArts, setCoverArts] = useState<Record<string, string>>({})
  const [currentTagline, setCurrentTagline] = useState(0)

  // Reference to the songs list section for scrolling
  const songsListRef = useRef<HTMLDivElement>(null)

  // Function to scroll to songs list
  const scrollToSongsList = () => {
    setTimeout(() => {
      if (songsListRef.current) {
        songsListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 300)
  }

  // Extract cover art from audio files
  const extractCoverArt = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const metadata = await parseBlob(blob)

      if (metadata.common.picture?.length) {
        const cover = metadata.common.picture[0]
        return `data:${cover.format};base64,${btoa(
          new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), ""),
        )}`
      }
    } catch (error) {
      console.error("Error extracting cover art:", error)
    }
    return DEFAULT_COVER
  }

  // Rotate taglines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get the most recent songs (last 3 added)
  const recentSongs = songs.slice().reverse().slice(0, 3)

  // Fetch cover arts for the recent songs
  useEffect(() => {
    const fetchCoverArts = async () => {
      const newCovers: Record<string, string> = {}
      for (const song of recentSongs) {
        if (song.audioUrl) {
          newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl)
        }
      }
      setCoverArts(newCovers)
    }
    if (recentSongs.length > 0) {
      fetchCoverArts()
    }
  }, [recentSongs])

  // Fetch all songs when component mounts
  useEffect(() => {
    dispatch(fetchAllSongs())
  }, [dispatch])

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "white", pb: 10 }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign="left"
              sx={{
                mb: 1,
                background: "linear-gradient(90deg, #00BCD4, #4fc3f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {taglines[currentTagline]}
            </Typography>

            <Typography variant="h6" color="#aaa" sx={{ mb: 4, maxWidth: "700px", textAlign: "left" }}>
              Explore a world of sounds, create playlists, and share your music taste with friends. Your perfect
              soundtrack awaits.
            </Typography>

            <DiscoverButton startIcon={<HeadphonesIcon />} size="large" onClick={() => navigate("register/")}>
              Start Exploring
            </DiscoverButton>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mt: -5, position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SearchBar onSearchComplete={scrollToSongsList} />
        </motion.div>
      </Container>

      {/* Category List */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
          Browse Categories
        </Typography>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <CategoryList onCategorySelect={scrollToSongsList} />
        </motion.div>
      </Container>

      {/* Songs List */}
      <Container maxWidth="lg" sx={{ mt: 6 }} ref={songsListRef}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
          All Songs
        </Typography>
        <SongsList />
      </Container>

      {/* Latest Releases Section */}
      <FeaturedReleases 
        recentSongs={recentSongs.map(song => ({ ...song, id: song.id.toString() }))} 
        coverArts={coverArts} 
        navigate={navigate} 
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
        <Box
          sx={{
            backgroundColor: "#111",
            borderRadius: 4,
            p: 6,
            backgroundImage: "linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Dive In?
          </Typography>
          <Typography variant="body1" color="#aaa" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Join thousands of music lovers discovering new sounds every day. Upload your first track or create your
            first playlist in seconds.
          </Typography>
          <DiscoverButton size="large" sx={{ px: 4, py: 1.5, fontSize: 18 }} onClick={() => navigate("register/")}>
            Get Started Now
          </DiscoverButton>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage
