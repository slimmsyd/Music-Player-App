import React, { useEffect } from 'react';
import '../styles/App.css'
import { useRef } from 'react';
export default function Song({currentSong}) { 
  
    return (
        <div className = "song_Container">
            <img src = {currentSong.cover} alt  = {currentSong.name} />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>



    )

}