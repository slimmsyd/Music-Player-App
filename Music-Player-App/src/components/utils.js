import React from "react";


export default function playAudio(isPlaying, audioRef) { 
    if(isPlaying) { 
        const playPromise = audioRef.current.play();
        //If the audio we clicked on is still undefined... Wait a bit then play.
        if(playPromise !== undefined) {
            playPromise.then((audio) => { 
                audioRef.current.play()
            });
        }
    }

}


