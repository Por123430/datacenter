import React from 'react'
import '../styles/popup.css'


function popup(props){
  return (props.trigger) ? (
    
    <div className='popup'>
        <div className='popup-inner'>
        
        
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