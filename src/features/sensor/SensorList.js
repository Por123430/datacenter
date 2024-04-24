// import React, { useState, useEffect } from 'react';
// import { useGetSensorQuery } from './sensorApiSlice';
// import "../../styles/Table.css";
// import Sensor from './Sensor';
// import level1 from "../../sound/level1.mp3";
// import level2 from "../../sound/level2.mp3";
// import level3 from "../../sound/level3.mp3";
// const SensorList = () => {
//   function play1() {
//     new Audio(level1).play();
//   }
//   function play2() {
//     new Audio(level2).play();
//   }
//   function play3() {
//     new Audio(level3).play();
//   }
//   const [music, setMusic] = useState([]);
//   const [activeMusicId, setActiveMusicId] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://datacenter-api.onrender.com/music`);
//       const result = await response.json();
//       setMusic(result);

//       // Find the active music ID
//       const activeMusic = result.find(item => item.active === true);
//       if (activeMusic) {
//         setActiveMusicId(activeMusic._id);
//       }
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleMusicButtonClick = async (id, no) => {
//     try {
//       const response = await fetch(`https://datacenter-api.onrender.com/music`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id,
//           active: true,
//         }),
//       });
//       if (response.ok) {
//         setActiveMusicId(id);
//         console.log(response);
//         if(no == 1){
//           play1();
//         }else if(no == 2){
//           play2();
//         }
//         else if(no == 3){
//           play3();
//         }
        
//         console.log(`Music with ID ${id} activated successfully.`);
//       } else {
//         console.error(`Failed to activate music with ID ${id}.`);
//       }
//     } catch (error) {
//       console.error('Error updating music:', error);
//     }
//   };

//   const {
//     data: sensor,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   } = useGetSensorQuery();

//   let content;

//   if (isLoading) content = <p>Loading...</p>;

//   if (isError) {
//     content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>;
//   }

//   if (isSuccess) {
//     const { ids } = sensor;

//     const tableContent = ids?.length
//       ? ids.map(sensorId => <Sensor key={sensorId} sensorId={sensorId} />)
//       : null;

//     content = (
//       <>
//       <div className="all-title-content" style={{
//     background: "#F4F4EF",
//     fontSize: "1.4rem",
//     padding: "20px 70px",
//     color: "black",
//     boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
//   }}>Edit Sensor</div>
//         <table className="table-user">
//           <thead className="table__thead">
//             <tr>
//               <th scope="col" className="table__thuser__username">model</th>
//               <th scope="col" className="table__thuser__username">temperature</th>
//               <th scope="col" className="table__thuser__username">humidity</th>
//               <th scope="col" className="table__thuser__username">position</th>
//               <th scope="col" className="table__thuser__username">edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableContent}
//           </tbody>
//         </table>
//         <div className='sound'>
//           <div className='title'>Set Sound</div>
//           <div className="update">
//             {music[0].map(musicItem => (
//               <button
//                 key={musicItem._id}
//                 onClick={() => handleMusicButtonClick(musicItem._id, musicItem.no)}
//                 className={activeMusicId === musicItem._id ? 'active' : ''}
//               >
//                 {musicItem.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return content;
// };

// export default SensorList;

import React, { useState, useEffect } from 'react';
import { useGetSensorQuery } from './sensorApiSlice';
import "../../styles/Table.css";
import Sensor from './Sensor';
import level1 from "../../sound/level1.mp3";
import level2 from "../../sound/level2.mp3";
import level3 from "../../sound/level3.mp3";

// Define audio playback functions outside the component
function playAudio(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.play().catch(error => console.error('Error playing audio:', error));
}

const SensorList = () => {
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
        switch (no) {
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
        <div className="all-title-content" style={{
          background: "#F4F4EF",
          fontSize: "1.4rem",
          padding: "20px 70px",
          color: "black",
          boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
        }}>Sensor</div>
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
          <div className='title' >Set Sound</div>
          <div className="update">
            {music.length > 0 && music.map(musicItem => (
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
