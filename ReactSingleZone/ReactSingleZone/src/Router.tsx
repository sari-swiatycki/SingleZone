import { createBrowserRouter } from 'react-router';

import PersonalArea from './components/PersonalArea';

import ProfileUpdate from './components/ProfileUpdate';

import Playlists from './components/PersonalPlayList';
import PlaylistSongs from './components/PlaylistSongsProps';

import SongPlayer from './components/SongPlayer'; // ייבוא עמוד ההשמעה
import FileUploader from './components/FileUploader ';
import HomePage from './components/HomePage';
import PersonalAreaMenu from './components/PersonalAreaMenu';
import Layout from './components/Layout';


export const Router = createBrowserRouter([
  {
    path: '/',element: <>
      {/* <Header />
      <CategoryList />
      <SearchBar />
      <SongsList /> */}
      <Layout/>
       
    </>,
    children:[ 

  
      
      {path: '//HomePage',element: <HomePage/>},
      { index: true, element:  <HomePage/>},
      {path: '//:id',element: <SongPlayer/>},
      
        




    ]
  },
  
 

  {path: '/personal-area',element: <><PersonalArea /></>,
    children: [
      { path: 'menu', element:  <PersonalAreaMenu />},
      { index: true, element:  <PersonalAreaMenu />},

      { path: 'playlist/:id', element: <PlaylistSongs /> },
      { path: 'playlists/:userId', element: <Playlists /> },
      { path: 'profile-update', element: <ProfileUpdate /> },
      { path: 'upload-song', element: <FileUploader /> },
    ],
  },
]);
