"use client"

import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Divider, Chip, Button } from "@mui/material"
import { styled } from "@mui/system"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import FavoriteIcon from "@mui/icons-material/Favorite"
import type { NavigateFunction } from "react-router-dom"

// Enhanced styled components with teal instead of green
const FeatureCard = styled(Card)(() => ({
  backgroundColor: "#222",
  color: "white",
  borderRadius: 16,
  transition: "all 0.4s ease",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 188, 212, 0.3)",
  },
}))

const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover"

interface Song {
  id: string
  title: string
  artist: string
  audioUrl: string
  album?: string
}

interface FeaturedReleasesProps {
  recentSongs: Song[]
  coverArts: Record<string, string>
  navigate: NavigateFunction
}

const FeaturedReleases = ({ recentSongs, coverArts, navigate }: FeaturedReleasesProps) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Latest Releases
        </Typography>
        <Chip label="Hot & Fresh" color="error" size="medium" icon={<FavoriteIcon />} sx={{ fontWeight: "bold" }} />
      </Box>

      <Divider sx={{ mb: 4, backgroundColor: "#333" }} />

      <Grid container spacing={4} justifyContent="flex-start">
        {recentSongs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard>
              <CardMedia
                component="img"
                height="280"
                image={coverArts[song.audioUrl] || DEFAULT_COVER}
                alt={song.title}
                sx={{
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    filter: "brightness(0.7)",
                  },
                }}
                onClick={() => navigate(`/${song.id}`)}
              />
              <CardContent sx={{ textAlign: "left", p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {song.title}
                </Typography>
                <Typography variant="subtitle1" color="#00BCD4" gutterBottom>
                  {song.artist}
                </Typography>
                {/* <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                  {song.album || "Single Release"} • {new Date().getFullYear()}
                </Typography> */}
                <Button
                  //  onClick={() => navigate(`/player/${song.id}`)}
                  variant="outlined"
                  startIcon={<MusicNoteIcon />}
                  fullWidth
                  sx={{
                    borderColor: "#00BCD4",
                    color: "#00BCD4",
                    borderRadius: 50,
                    "&:hover": {
                      backgroundColor: "#00BCD4",
                      color: "white",
                      borderColor: "#00BCD4",
                    },
                  }}
                >
                  Play Now
                </Button>
              </CardContent>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default FeaturedReleases
