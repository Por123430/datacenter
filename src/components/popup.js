import React, { useState, useEffect } from 'react';
import '../styles/popup.css';
import alert from '../img/alert.png';
import sound1 from "../sound/Radar_-_iPhone_Ringtone.mp4";
import sound2 from "../sound/todtod.mp4";

function Popup(props) {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/music/active`);
      const result = await response.json();
      setMusic(result);
      if (result.no === 1) {
        play1();
      } else if (result.no === 2) {
        play2();
      } else if (result.no === 3) {
        play3();
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  function play1() {
    new Audio(sound1).play();
  }

  function play2() {
    new Audio(sound2).play();
  }

  function play3() {
    new Audio(sound1).play();
  }

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <img src={alert} alt='alert' />
        <div className='title'>
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
