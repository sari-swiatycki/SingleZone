import { createTheme } from "@mui/material"

// Custom monochromatic theme with turquoise accents
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Darker black background
      paper: "#1E1E1E", // Dark gray for cards
    },
    primary: {
      main: "#22d3ee", // Turquoise accent color
    },
    secondary: {
      main: "#a1a1aa", // Gray for secondary elements
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.25px",
    },
    subtitle1: {
      fontWeight: 400,
      opacity: 0.8,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        },
      },
    },
  },
})

export const cardData = [
  {
    id: "upload",
    title: "Upload Files",
    description: "Upload videos and images",
    iconColor: "#22d3ee", // Turquoise
    bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
  },
  {
    id: "playlists",
    title: "Playlists",
    description: "Play and edit playlists",
    iconColor: "#22d3ee", // Turquoise
    bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
  },
  {
    id: "profile",
    title: "User Profile",
    description: "Edit personal details",
    iconColor: "#22d3ee", // Turquoise
    bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
  },
]
