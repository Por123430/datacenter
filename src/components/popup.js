import React from 'react'
import '../styles/popup.css'
import alert from '../img/alert.png'

function popup(props){
  return (props.trigger) ? (
    
    <div className='popup'>
        <div className='popup-inner'>
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
