import React from "react";


export default function LibrarySong({setSongs,isPlaying,song,songs, setCurrentSong,id, audioRef}) { 
  const songSelectHandler = () => {
    //Access to all the songs
    //Make sure the song clicked on is the one from state
    const selectedSong = songs.filter((state)  => state.id === id);
    //Select current song the song user clicked on
    setCurrentSong(selectedSong[0]);
    //Add active State
    const newSongs = songs.map((song) => { 
        //check if SongId(clicked on )
        if (song.id === id) { 
            return {                //Return the whole song but modifiy the active prop to true
                ...song,
                active: true,
            }
        }else { 
            return { 
                ...song,
                active: false,
            }
        };



    });
    setSongs(newSongs)


    audioRef.current.play();
    


  };
    return (
        <div onClick = {songSelectHandler} className = {`library-song ${song.active ? 'selected' : " "} `}>
            <img src = {song.cover} alt  = {song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )

};