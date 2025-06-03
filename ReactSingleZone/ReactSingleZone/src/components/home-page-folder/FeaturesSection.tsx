import { Container, Typography, Grid, Card, Chip } from "@mui/material"
import { styled } from "@mui/system"
import AlbumIcon from "@mui/icons-material/Album"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import HeadphonesIcon from "@mui/icons-material/Headphones"

const InfoCard = styled(Card)(() => ({
  backgroundColor: "#222",
  color: "white",
  borderRadius: 16,
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  height: "100%",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 188, 212, 0.3)",
    backgroundColor: "#282828",
  },
}))

const FeaturesSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight="bold" color="white" textAlign="left" sx={{ mb: 4 }}>
        Everything You Need
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <AlbumIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Upload Songs
            </Typography>
            <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
              Share your music with the world. Upload high-quality audio files in seconds with our streamlined process.
            </Typography>
            <Chip label="Easy Upload" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <FavoriteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Save Favorites
            </Typography>
            <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
              Create your personal collection. Save tracks that move you and access them anytime, anywhere.
            </Typography>
            <Chip label="One Click" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <MusicNoteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Manage Library
            </Typography>
            <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
              Full control over your music. Edit metadata, organize by genre, and keep your collection pristine.
            </Typography>
            <Chip label="Total Control" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCard>
            <HeadphonesIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Create Playlists
            </Typography>
            <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
              Curate the perfect soundtrack for any mood or occasion. Build and share custom playlists with friends.
            </Typography>
            <Chip label="Share Music" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
          </InfoCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FeaturesSection
