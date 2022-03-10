import React, { useState, useEffect} from 'react';
import '../styles/App.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faBook, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons'
export default function Player({
    setSongs ,setCurrentSong,songs,songInfo, setSongInfo,audioRef, currentSong, isPlaying, setIsPlaying}) 
{ 

    //UseEffect
    useEffect(() => { 
        const newSongs = songs.map((song) => { 
            //check if SongId(clicked on )
            if (song.id === currentSong.id) { 
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
    
    
    
        }, [currentSong]);//Run this function EveryTime CurrentSong gets Updated
        setSongs(newSongs)
    })


    //Event Handlers
    const playSongHandler = () => { 
    if(isPlaying) { 
        audioRef.current.pause ();
         //If clicked then pause
         setIsPlaying(!isPlaying) //Setting the playing to oppoiste
    }else { 
        audioRef.current.play();
        setIsPlaying(!isPlaying) //Setting the playing to the opposite of what is was
    }

}

//Gets the Time
const getTime = (time) => {
    return ( 
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2))
};

const dragHandler = (e) => { 
    audioRef.current.currentTime = e.target.value; //getting the value proposition of input value
    setSongInfo({...songInfo, currentTime: e.target.value})
    
};

//Direction Param -> Matters if we skpping back or forwrad
const skipTrackHandler = async (direction) => { 
    //Find Where User is -> Know where The Previous song is and Next Song is 
    //Get The Index(Number Of Song)
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);  
         //song id matches to currentSongId(user is on that song)
        if(direction === "skip-forward")  {
            //Dynamically Pass Down Current Song in The Array
            //Gets the next Song In The Song Array Index(Number of Song + 1)
            //Add Moldous Operator To Start Back @ The Beginning of Array
            await setCurrentSong(songs[(currentIndex + 1) % songs.length ])
        }; 
        
        if (direction ===  "skip-back") { 
           if((currentIndex - 1) % songs.length === -1) { 
               //songs.length returns us the Last Song// Lets us set the song to the last song in array.
               await setCurrentSong(songs[songs.length - 1])
               return;
           }
           await setCurrentSong(songs[currentIndex -1])
        }
        if(isPlaying) audioRef.current.play();
};



//State


    return (
        <div className = "player">
            <div className = "time_Control">
                <p>{songInfo.duration ?  getTime(songInfo.currentTime) : "0:00"}</p>
                <input 
                onChange={dragHandler} 
                min ={0} max={songInfo.duration || 0 } 
                value={songInfo.currentTime} 
                type = "range">
                </input>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className = "player_control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className = "skip_Back" size = "2x" icon = {faAngleLeft}  />
                <FontAwesomeIcon   onClick={playSongHandler} className = "play" size = "2x" icon = { isPlaying ? faPause :faPlay }  />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className = "skip_Forward" size = "2x" icon = {faAngleRight}  />
            </div>
        
        </div>

    )



}