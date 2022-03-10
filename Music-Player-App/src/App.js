import logo from './logo.svg';
import './styles/App.css'
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import { useState, useRef } from 'react';
import data from './data';
import Nav from './components/Nav';
import playAudio from './components/utils';
function App() {

    //Reference
    const audioRef = useRef(null) //Allows you to get the reference of the HTML element you want to refernce
    //Update the time
  const timeUpdateHandler = (e) => { 
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration: duration})
};
    const [songInfo, setSongInfo] = useState({
      currentTime: 0, //Setting the default value(bc we don't know how long)
      duration: 0,
  }); 

  const songEndHandler = async() => { 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);  
         //song id matches to currentSongId(user is on that song)
            //Dynamically Pass Down Current Song in The Array
            //Gets the next Song In The Song Array Index(Number of Song + 1)
            //Add Moldous Operator To Start Back @ The Beginning of Array
            await setCurrentSong(songs[(currentIndex + 1) % songs.length ])
           if(isPlaying) audioRef.current.play();
  }
  
//State
const [songs, setSongs] = useState(data());
const [currentSong, setCurrentSong] = useState(songs[0])
const [isPlaying, setIsPlaying] =useState(false)
const [libraryStatus, setLibraryStatus] = useState(false)


  return (
    <div  className={`App ${libraryStatus ? 'library-active' : ''}`}>
    <Nav 
    libraryStatus = {libraryStatus}
    setLibraryStatus = {setLibraryStatus}
    
    />
    <Song
    currentSong = {currentSong}    
    
    />
    <Player
    setSongInfo = {setSongInfo}
    songInfo = {songInfo}
    audioRef = {audioRef}
    currentSong = {currentSong}
    setIsPlaying = {setIsPlaying}
    isPlaying = {isPlaying}
    songs = {songs}
    setCurrentSong = {setCurrentSong}
    setSongs = {setSongs}
    />
    <Library 
    isPlaying = {isPlaying}
    audioRef = {audioRef}
    songs = {songs} 
    setCurrentSong = {setCurrentSong}
    libraryStatus = {libraryStatus}
    setSongs = {setSongs}
    
    />
    <audio 
    onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src = {currentSong.audio}></audio>
    </div>
  );
}

export default App;
