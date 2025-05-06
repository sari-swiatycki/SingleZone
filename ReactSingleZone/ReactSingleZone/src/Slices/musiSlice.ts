// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     songs: [],
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
// };

// export const fetchSongs = createAsyncThunk('music/fetchSongs', async () => {
//     const response = await axios.get('http://localhost:5000/api/songs');
//     return response.data;
// });

// export const addSong = createAsyncThunk('music/addSong', async (newSong) => {
//     const response = await axios.post('http://localhost:5000/api/songs', newSong);
//     return response.data;
// });

// const musicSlice = createSlice({
//     name: 'music',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSongs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchSongs.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.songs = action.payload;
//             })
//             .addCase(fetchSongs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addSong.fulfilled, (state, action) => {
//                 state.songs.push(action.payload);
//             });
//     },
// });

// export default musicSlice.reducer;















import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// ממשק עבור השיר
interface Song {
    id: number;
    title: string;
    artist: string;
    audioUrl: string;
}

// ממשק עבור ה-state
interface MusicState {
    songs: Song[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// ה-state ההתחלתי
const initialState: MusicState = {
    songs: [],
    status: 'idle',
    error: null,
};

// פעולה אסינכרונית לשליפת שירים
export const fetchSongs = createAsyncThunk<Song[]>('music/fetchSongs', async () => {
    const response = await axios.get('http://localhost:5000/api/songs');
    return response.data;
});

// פעולה אסינכרונית להוספת שיר
export const addSong = createAsyncThunk<Song, Song>('music/addSong', async (newSong) => {
    const response = await axios.post('http://localhost:5000/api/songs', newSong);
    return response.data;
});

// יצירת ה-Slice
const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSongs.fulfilled, (state, action: PayloadAction<Song[]>) => {
                state.status = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch songs';
            })
            .addCase(addSong.fulfilled, (state, action: PayloadAction<Song>) => {
                state.songs.push(action.payload);
            });
    },
});

export default musicSlice.reducer;
