import React, { useState, useEffect } from 'react';
import { useGetSensorQuery } from './sensorApiSlice';
import "../../styles/Table.css";
import Sensor from './Sensor';
import sound1 from "../../sound/Radar_-_iPhone_Ringtone.mp4";
import sound2 from "../../sound/todtod.mp4";
const SensorList = () => {
  function play1() {
    new Audio(sound1).play();
  }
  function play2() {
    new Audio(sound2).play();
  }
  function play3() {
    new Audio(sound1).play();
  }
  const [music, setMusic] = useState([]);
  const [activeMusicId, setActiveMusicId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/music`);
      const result = await response.json();
      setMusic(result);

      // Find the active music ID
      const activeMusic = result.find(item => item.active === true);
      if (activeMusic) {
        setActiveMusicId(activeMusic._id);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMusicButtonClick = async (id, no) => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/music`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          active: true,
        }),
      });
      if (response.ok) {
        setActiveMusicId(id);
        console.log(response);
        if(no == 1){
          play1();
        }else if(no == 2){
          play2();
        }
        else if(no == 3){
          play3();
        }
        
        console.log(`Music with ID ${id} activated successfully.`);
      } else {
        console.error(`Failed to activate music with ID ${id}.`);
      }
    } catch (error) {
      console.error('Error updating music:', error);
    }
  };

  const {
    data: sensor,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSensorQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = sensor;

    const tableContent = ids?.length
      ? ids.map(sensorId => <Sensor key={sensorId} sensorId={sensorId} />)
      : null;

    content = (
      <>
        <table className="table-user">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__thuser__username">model</th>
              <th scope="col" className="table__thuser__username">temperature</th>
              <th scope="col" className="table__thuser__username">humidity</th>
              <th scope="col" className="table__thuser__username">position</th>
              <th scope="col" className="table__thuser__username">edit</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
        <div className='sound'>
          <div className='title'>Set Sound</div>
          <div className="update">
            {music.map(musicItem => (
              <button
                key={musicItem._id}
                onClick={() => handleMusicButtonClick(musicItem._id, musicItem.no)}
                className={activeMusicId === musicItem._id ? 'active' : ''}
              >
                {musicItem.name}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default SensorList;
