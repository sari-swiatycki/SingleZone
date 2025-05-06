
import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import {  RootStore } from '../Stores/songStore';
import RatingStars from './RatingStars';


// const SongsList: React.FC<SongsListProps> = ({ categoryId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { songs, loading, error } = useSelector((state: RootStore) => state.actionSongs);

//     useEffect(() => {
//         dispatch(fetchSongsByCategory(categoryId));
//     }, [dispatch, categoryId]);

//     if (loading) return <p>טוען שירים...</p>;
//     if (songs.length === 0) return <p>אין שירים בקטגוריה זו.</p>;

//     return (
//         <div>
//             <h2>שירים בקטגוריה {categoryId}</h2>
//             {songs.map((song) => (
//                 <div key={song.id} style={{ marginBottom: '20px' }}>
//                     <h3>{song.title}</h3>
//                     <p>אמן: {song.artist}</p>
                    
//                     {/* הצגת הדירוג עם כוכבים */}
//                     <RatingStars rating={song.avgRating || 0} />

//                     <audio controls>
//                         <source src={song.audioUrl} type="audio/mp3" />
//                         הדפדפן שלך לא תומך בניגון שמע.
//                     </audio>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SongsList;







// const SongsList: React.FC<SongsListProps> = ({ categoryId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { songs, loading, error } = useSelector((state: RootStore) => state.actionSongs);
//     const { searchResults } = useSelector((state: RootStore) => state.actionSongs);
  
//     useEffect(() => {
//       if (!searchResults.length) {
//         dispatch(fetchSongsByCategory(categoryId));
//       }
//     }, [dispatch, categoryId, searchResults.length]);
  
  
//     if (loading) return <p>טוען שירים...</p>;
//     if (searchResults.length === 0 && songs.length === 0) return <p>אין שירים.</p>;
    

//     const songsToDisplay = searchResults.length ? searchResults : songs;
//     console.log(songsToDisplay[10]);
    
  
//     return (
//       <div>
//         <h2>שירים</h2>
//         {songsToDisplay.map((song) => (
        
//           <div key={song.id} style={{ marginBottom: "20px" }}>
            
//             <h3>{song.title}</h3>
//             <p>אמן: {song.artist}</p>
//             <RatingStars rating={song.avgRating || 0} />
//             <audio controls>
//               <source src={song.audioUrl} type="audio/mp3" />
//               הדפדפן שלך לא תומך בניגון שמע.
//             </audio>
//           </div>
//         ))}
//       </div>
//     );
//   };
//   export default SongsList;

















// import { Box, Typography } from "@mui/material";

// //הוספות יעל
// import { parseBlob } from "music-metadata-browser";
// import { Buffer } from "buffer";
// window.Buffer = Buffer;

// const SongsList: React.FC = () => {
//   const { filteredSongs, loading, error } = useSelector(
//     (state: RootStore) => state.actionSongs
//   );



  
// //פונקציה יעל
// const extractCoverArt = async (fileUrl) => {
//   console.log('ib extract',fileUrl);
  
//   const response = await fetch(fileUrl);
//   console.log('response',response);
  
//   const blob = await response.blob();
//   console.log('blob',blob);
  
//   const metadata = await parseBlob(blob);
//   console.log('metadata', metadata);

//   if (metadata.common.picture && metadata.common.picture.length > 0) {
//     const cover = metadata.common.picture[0];
//     return `data:${cover.format};base64,${btoa(
//       new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//     )}`;
//   }
//   return null;
// };


//   if (loading) return <Typography>טוען שירים...</Typography>;
 

//   return (
//     <Box sx={{ p: 2 }}>
//         {filteredSongs.map((song: song, index: number) => (
//                 <div key={index} style={{ marginBottom: '20px' }}>
//                     <h3>{song.title}</h3>
//                     <p>אמן: {song.artist}</p>
//                     <RatingStars rating={song.avgRating || 0} /> {/* הצגת דירוג */}
//                     <audio controls>
//                         <source src={song.audioUrl} type="audio/mp3" />
//                         הדפדפן שלך לא תומך בניגון שמע.
//                     </audio>
//                 </div>
//             ))}
//     </Box>
//   );
// };
// export default SongsList;





















// import { parseBlob } from "music-metadata-browser";
// import { Buffer } from "buffer";
// import { Box, Typography } from '@mui/material';
// window.Buffer = Buffer;

// const SongsList: React.FC = () => {
//   const { filteredSongs, loading } = useSelector(
//     (state: RootStore) => state.actionSongs
//   );
//   // יצירת סטייט לשמירת כתובות התמונות לכל שיר
//   const [coverArts, setCoverArts] = useState<{ [key: string]: string | null }>({});

//   // פונקציה שמביאה את תמונת השיר
//   const extractCoverArt = async (fileUrl: string) => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const metadata = await parseBlob(blob);

//       if (metadata.common.picture && metadata.common.picture.length > 0) {
//         const cover = metadata.common.picture[0];
//         return `data:${cover.format};base64,${btoa(
//           new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//         )}`;
//       }
//     } catch (error) {
//       console.error("Error extracting cover art:", error);
//     }
//     return null;
//   };

//   // טעינת התמונות עבור כל שיר
//   useEffect(() => {
//     const fetchCoverArts = async () => {
//       const newCovers: { [key: string]: string | null } = {};

//       for (const song of filteredSongs) {
//         if (song.audioUrl) {
//           newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
//         }
//       }

//       setCoverArts(newCovers);
//     };

//     if (filteredSongs.length > 0) {
//       fetchCoverArts();
//     }
//   }, [filteredSongs]);

//   if (loading) return <Typography>טוען שירים...</Typography>;

//   return (
//     <Box sx={{ p: 2 }}>
//       {filteredSongs.map((song: song, index: number) => (
//         <div key={index} style={{ marginBottom: "20px" }}>
//           <h3>{song.title}</h3>
//           <p>אמן: {song.artist}</p>
//           {coverArts[song.audioUrl] && (
//             <img
//               src={coverArts[song.audioUrl] || ""}
//               alt="עטיפת השיר"
//               style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
//             />
//           )}


          
//           <RatingStars rating={song.avgRating || 0} /> {/* הצגת דירוג */}
                  
//           <audio controls>
//             <source src={song.audioUrl} type="audio/mp3" />
//             הדפדפן שלך לא תומך בניגון שמע.
//           </audio>
//         </div>
//       ))}
//     </Box>
//   );
// };

// export default SongsList;

















// import { parseBlob } from "music-metadata-browser";
// import { Buffer } from "buffer";
// import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// window.Buffer = Buffer;

// const DEFAULT_COVER = "https://via.placeholder.com/200?text=No+Cover";

// const SongsList = () => {
//   const { filteredSongs, loading } = useSelector((state) => state.actionSongs);
//   const navigate = useNavigate();
//   const [coverArts, setCoverArts] = useState({});

//   const extractCoverArt = async (fileUrl) => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const metadata = await parseBlob(blob);

//       if (metadata.common.picture?.length) {
//         const cover = metadata.common.picture[0];
//         return `data:${cover.format};base64,${btoa(
//           new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//         )}`;
//       }
//     } catch (error) {
//       console.error("Error extracting cover art:", error);
//     }
//     return DEFAULT_COVER;
//   };

//   useEffect(() => {
//     const fetchCoverArts = async () => {
//       const newCovers = {};
//       for (const song of filteredSongs) {
//         if (song.audioUrl) {
//           newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
//         }
//       }
//       setCoverArts(newCovers);
//     };
//     if (filteredSongs.length > 0) {
//       fetchCoverArts();
//     }
//   }, [filteredSongs]);

//   if (loading) return <Typography>טוען שירים...</Typography>;

//   return (
//     <Box
//       sx={{
//         p: 2,
//         width: "100%",
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//         gap: 3,
       
//       }}
//     >
//       {filteredSongs.map((song, index) => (
//         <Card
//           key={index}
//           sx={{
//             cursor: "pointer",
//             transition: "transform 0.3s, box-shadow 0.3s",
//             '&:hover': {
//               transform: "scale(1.05)",
//               boxShadow: 6,
//             },
//           }}
//           onClick={() => navigate(`/${song.id}`)}
//         >
//           <CardMedia
//             component="img"
//             height="160"
//             image={coverArts[song.audioUrl] || DEFAULT_COVER}
//             alt="עטיפת השיר"
//           />
//           <CardContent sx={{ textAlign: "center" }}>
//             <Typography variant="h6" fontWeight={600} gutterBottom>
//               {song.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {song.artist}
//             </Typography>
//             <Box mt={1}>
//               <RatingStars rating={song.avgRating || 0} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default SongsList;
// SongsList.tsx







import { parseBlob } from "music-metadata-browser";
import { Buffer } from "buffer";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RatingModalProps from './RatingModalProps ';

(window as any).Buffer = Buffer;

const DEFAULT_COVER = "https://via.placeholder.com/200?text=No+Cover";

const SongsList = () => {
  const { filteredSongs, loading } = useSelector((state: RootStore) => state.actionSongs);
  const navigate = useNavigate();
  const [coverArts, setCoverArts] = useState<{ [key: string]: string | null }>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [selectedSongTitle, setSelectedSongTitle] = useState("");

  const extractCoverArt = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const metadata = await parseBlob(blob);

      if (metadata.common.picture?.length) {
        const cover = metadata.common.picture[0];
        return `data:${cover.format};base64,${btoa(
          new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`;
      }
    } catch (error) {
      console.error("Error extracting cover art:", error);
    }
    return DEFAULT_COVER;
  };

  useEffect(() => {
    const fetchCoverArts = async () => {
      const newCovers: { [key: string]: string | null } = {};
      for (const song of filteredSongs) {
        if (song.audioUrl) {
          newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
        }
      }
      setCoverArts(newCovers);
    };
    if (filteredSongs.length > 0) {
      fetchCoverArts();
    }
  }, [filteredSongs]);

  const handleOpenModal = (songId: number, songTitle: string) => {
    setSelectedSongId(songId);
    setSelectedSongTitle(songTitle);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSongId(null);
    setSelectedSongTitle("");
  };

  if (loading) return <Typography>טוען שירים...</Typography>;

  return (
    <>
      <Box
        sx={{
          p: 2,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 3,
        }}
      >
        {filteredSongs.map((song, index) => (
          <Card
            key={index}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              '&:hover': {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
            onClick={() => navigate(`/${song.id}`)}
          >
            <CardMedia
              component="img"
              height="160"
              image={coverArts[song.audioUrl] || DEFAULT_COVER}
              alt="עטיפת השיר"
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {song.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.artist}
              </Typography>
              <Box mt={1}>
                {/* Assuming RatingStars is another component */}
                <RatingStars rating={song.avgRating || 0} />
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Card click
                  handleOpenModal(song.id, song.title);
                }}
              >
                דרג שיר
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      {/* Rating Modal */}
      {selectedSongId && (
        <RatingModalProps
          open={openModal}
          onClose={handleCloseModal}
          songId={selectedSongId}
          songTitle={selectedSongTitle}
        />
      )}
    </>
  );
};
export default SongsList;


























