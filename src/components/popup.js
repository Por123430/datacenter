import React, { useState, useEffect } from 'react';
import '../styles/popup.css';
import alert from '../img/alarm.png';
import level1 from "../sound/level1.mp3";
import level2 from "../sound/level2.mp3";
import level3 from "../sound/level3.mp3";

function Popup(props) {
  const [music, setMusic] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/music/active`);
      const result = await response.json();
      setMusic(result);
      
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (music) { // Only play music when music state is set
      switch (music[0].no) { // Assuming music.no represents level number
        case 1:
          playAudio(level1);
          break;
        case 2:
          playAudio(level2);
          break;
        case 3:
          playAudio(level3);
          break;
        default:
          break;
      }
    }
  }, [music]); 
  const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play().catch(error => console.error('Error playing audio:', error));
  };

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <img src={alert} alt='alert' />
        <div className='title-popup'>
          {props.children}
        </div>
        <button className='close-btn' onClick={() => props.setTrigger(false)}>
          close
        </button>
      </div>
    </div>
  ) : null;
}

export default Popup;
