import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import SearchBar from './SearchBar';
import { RootStore, AppDispatch } from "../Stores/songStore"; // ייבוא AppDispatch
import { addSongToPlaylist } from "../Slices/playlistSlice";

interface SongListForPlaylistProps {
  playlistId: number;
  onClose: () => void;
}

const SongListForPlaylist: React.FC<SongListForPlaylistProps> = ({ playlistId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>(); // שינוי כאן

  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  // const categoryId = useSelector((state: RootStore) => state.songs.categories[0]?.id);

  // useEffect(() => {
  //   dispatch(fetchPlaylistSongs(playlistId));
  // }, [dispatch]);

  const handleToggle = (songId: number) => () => {
    const currentIndex = selectedSongs.indexOf(songId);
    const newSelectedSongs = [...selectedSongs];

    if (currentIndex === -1) {
      newSelectedSongs.push(songId);
    } else {
      newSelectedSongs.splice(currentIndex, 1);
    }

    setSelectedSongs(newSelectedSongs);
  };

  const handleAddSongs = () => {
    selectedSongs.forEach((songId) => {
      dispatch(addSongToPlaylist({ playlistId: playlistId, songId: songId }));
    });
    onClose();
  };

  return (
    <Box>
      <SearchBar/>      
      <List>
        {useSelector((state: RootStore) => state.actionSongs.filteredSongs).map((song) => (
          <ListItem key={song.id} role="listitem" onClick={handleToggle(song.id)}>
            <FormControlLabel
              control={<Checkbox checked={selectedSongs.indexOf(song.id) !== -1} />}
              label={`${song.title} - ${song.artist}`}
            />
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAddSongs}>הוסף שירים</Button>
    </Box>
  );
};

export default SongListForPlaylist;