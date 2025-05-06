import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { parseBlob } from "music-metadata-browser";
import { RootStore } from "../Stores/songStore";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover";

const SongPlayer: React.FC = () => {
  const { id } = useParams();
  const { filteredSongs } = useSelector((state: RootStore) => state.actionSongs);
  const song = filteredSongs.find((s) => s.id === Number(id));
  const [coverArt, setCoverArt] = useState<string>(DEFAULT_COVER);
  // const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const extractCoverArt = async () => {
      if (!song || !song.audioUrl) return;
      try {
        const response = await fetch(song.audioUrl);
        const blob = await response.blob();
        const metadata = await parseBlob(blob);
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const cover = metadata.common.picture[0];
          setCoverArt(
            `data:${cover.format};base64,${btoa(
              new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            )}`
          );
        }
      } catch (error) {
        console.error("Error extracting cover art:", error);
      }
    };

    extractCoverArt();
  }, [song]);

  const handleDownload = () => {
    if (song && song.audioUrl) {
      const link = document.createElement('a');
      link.href = song.audioUrl;
      link.download = `${song.title}.mp3`;
      link.click();
    }
  };

  if (!song) {
    return <Typography>שיר לא נמצא</Typography>;
  }

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        p: 4, 
        height: "100vh", 
        justifyContent: "center", 
        backgroundColor:"black",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4"  color="white" >{song.title}</Typography>
        <Typography variant="h6" color="white">
        {song.artist}
        </Typography>
      </Box>

      <Box 
        sx={{ 
          width: "100%", 
          maxWidth: 500, 
          mb: 3,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden"
        }}
      >
        <img
          src={coverArt}
          alt="עטיפת השיר"
          style={{ 
            width: "100%", 
            height: "auto", 
            objectFit: "cover" 
          }}
        />
      </Box>

      <Box 
        sx={{ 
          width: "100%", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}
      >
        <audio 
          controls 
          style={{ 
            width: "100%", 
            maxWidth: 600 
          }}
        >
          <source src={song.audioUrl} type="audio/mp3" />
          הדפדפן שלך לא תומך בניגון שמע.
        </audio>

        <Button 
          variant="contained" 
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
          sx={{ mt: 2 }}
        >
          הורד שיר
        </Button>
      </Box>
    </Box>
  );
};

export default SongPlayer;