import React from 'react'
import '../styles/popup.css'
import alert from '../img/alert.png'
import sound3 from "../sound/Radar_-_iPhone_Ringtone.mp4";

function popup(props){
  function play3() {
    new Audio(sound3).play();
  }
  return (props.trigger) ? (
    
    
    <div className='popup'>
        <div className='popup-inner'>
        {play3()}
          <img src={alert} alt='alert'></img>
        
            <div className='title'>

            
            { props.children }
            </div>
            <button className='close-btn' onClick={() => props.setTrigger(false)}
            >close</button>
            
        </div>
    </div>
  ) : "";
}

export default popup