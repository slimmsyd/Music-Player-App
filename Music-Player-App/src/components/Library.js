import React from "react";
import LibrarySong from "./Librarysongs";



export default function Library({setSongs, libraryStatus,isPlaying,audioRef, songs, setCurrentSong}) { 

    return  (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
          <div className = "library-songs">
            {songs.map(song =>  
                <LibrarySong 
                songs = {songs} //All songs from state
                song = {song} //Each ind songs and info
                setCurrentSong = {setCurrentSong} //function to change current song 
                id = {song.id} //id of the song 
                key = {song.id} //key -> react requires the song
                audioRef = {audioRef} //Each Indiv. Song
                isPlaying = {isPlaying}
                setSongs  = {setSongs}
                />
            )}
              </div>  
        </div>
    )

};