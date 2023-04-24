// import React from 'react'
// import { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import { ref, onValue } from "firebase/database";
// import Popup from "../../components/popup";
// import { useAddNotihumiMutation } from "../notification/noti_humi/notihumiApiSlice";
// import { useAddNotitempMutation } from "../notification/noti_temp/notitempApiSlice";
// import { useAddNotilightMutation } from "../notification/noti_light/notilightApiSlice";
// import { useSelector } from "react-redux";
// import { selectAllSensor } from "../sensor/sensorApiSlice";
// import sound1 from "../../sound/2023-03-27 16-07-52.mp4";
// import sound2 from "../../sound/todtod.mp4";
// import "../../styles/monitor.css";
// const ControllerData = () => {
//     const sensor1 = useSelector((state) => selectAllSensor(state));
//   // const sensor3 = useSelector(state => selectSensorById(state, sensorId));

//   // console.log("sdfas",sensor.tm)
//   const [addNotiNumi] = useAddNotihumiMutation();
//   const [addNotiTemp] = useAddNotitempMutation();
//   const [addNotiLight] = useAddNotilightMutation();
//   // const { data: sensor2 } = useGetSensorQuery();
//   const [buttonPopup, setButtonPopup] = useState(false);
//   const [todoData, setTodoData] = useState([]);
//   const [sensor2Data, setSensor2Data] = useState([]);
//   const [titlePopup, setTitlePopup] = useState("");
//   const [dataPopup, setDataPopup] = useState(0);
//   const [imageData, setImageData] = useState([]);

//   useEffect(() => {
//     const starCountRef = ref(db, "ESP32/");
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       setTodoData(data);
//     });
//   }, []);

//   useEffect(() => {
//     const starCountRef = ref(db, "Sensor2/");
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       setSensor2Data(data);
//     });
//   }, []);

//   useEffect(() => {
//     const starCountRef = ref(db, "data/");
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       console.log("img", data);
//       setImageData(data);
//     });
//   }, []);

//   // const setButtonPopupp = () => {
//   //     setButtonPopup(true);
//   //   };

//   function play1() {
//     new Audio(sound1).play();
//   }
//   function play2() {
//     new Audio(sound2).play();
//   }
//   // useEffect(()=>{

//   // },[sensor1])
//   useEffect(() => {
//     if (sensor1.length > 0) {
//       console.log("temp", sensor1[0].temp);
//       console.log("humidity", sensor1[0].moisture);
//     }
//     if (sensor1.length > 0) {
//       if (todoData.temperature > sensor1[0].temp) {
//         play1();
//         setButtonPopup(true);
//         setTitlePopup("over temperature");
//         setDataPopup(todoData.temperature);
//         const temperature = todoData.temperature;
//         addNotiTemp({ temperature });
//       }
//       if (todoData.humidity > sensor1[0].moisture) {
//         play2();
//         setButtonPopup(true);
//         setTitlePopup("over humidity");
//         setDataPopup(todoData.humidity);
//         const humidity = todoData.humidity;
//         addNotiNumi({ humidity });
//       }
//       if (todoData.flame > 0) {
//         play2();
//         setButtonPopup(true);
//         setTitlePopup("flame");
//         setDataPopup(todoData.flame);
//         const light = todoData.flame;
//         addNotiLight({ light });
//       }
//     }
//   }, [
//     sensor1,
//     todoData.temperature,
//     todoData.humidity,
//     todoData.flame,
//     addNotiNumi,
//     addNotiTemp,
//     addNotiLight,
//   ]);

//   return (
//     <div>   {buttonPopup ? (
//         <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
//           {titlePopup}
//           <br></br>
//           {dataPopup}
//         </Popup>
//       ) : (
//         <></>
//       )}</div>
//   )
  
// }

// export default ControllerData