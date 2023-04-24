import { Outlet } from "react-router-dom";
import React, { useRef } from "react";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";
import DashNav from "./DashNav";


import { useAddNotihumiMutation } from "../features/notification/noti_humi/notihumiApiSlice";
import { useAddNotitempMutation } from "../features/notification/noti_temp/notitempApiSlice";
import { useAddNotilightMutation } from "../features/notification/noti_light/notilightApiSlice";
import { useAddNoticameraMutation } from "../features/notification/noti_camara/noticameraApiSlice";

import Popup from "./popup";

import { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";

import { db,storage } from "../firebase";
import { useSelector } from "react-redux";
import { selectAllSensor } from "../features/sensor/sensorApiSlice";

const DashLayout = () => {
  const sensor1 = useSelector((state) => selectAllSensor(state));

  const [addNoticamera] = useAddNoticameraMutation();
  const [addNotiNumi] = useAddNotihumiMutation();
  const [addNotiTemp] = useAddNotitempMutation();
  const [addNotiLight] = useAddNotilightMutation();

  const [buttonPopup, setButtonPopup] = useState(false);
  const [sensor1Data, setSensor1Data] = useState([]);
  const [sensor2Data, setSensor2Data] = useState([]);
  const [titlePopup, setTitlePopup] = useState("");
  const [dataPopup, setDataPopup] = useState(0);
  
  const [motionData, setMotionData] = useState(false);


  useEffect(() => {
    const starCountRef = dbRef(db, "ESP32/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor1Data(data);
    });
    
  }, []);

  useEffect(() => {
    const starCountRef = dbRef(db, "ESP32-Device2/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor2Data(data);
    });
  }, []);

  useEffect(() => {
    const starCountRef = dbRef(db, "Motion/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setMotionData(data);
    });
  }, []);


  
  

  



  useEffect(() => {
    
   
    if (motionData.motion === true) {
      setButtonPopup(true);
      setTitlePopup("Motion");
      const Motion = "detect";
      setDataPopup(Motion);
      
    }
    if (sensor1Data.flame === 0) {
      setButtonPopup(true);
      setTitlePopup("sensor1 flame");

      const flame = "detect";
      setDataPopup(flame);
      
      addNotiLight({ flame });
    }
    if (sensor2Data.flame === 0) {
      setButtonPopup(true);
      setTitlePopup("sensor2 flame");
      const flame = "detect";
      setDataPopup(flame);
      
      addNotiLight({ flame });
    }

    if (sensor1.length > 0) {
      if (sensor1Data.temperature > sensor1[0].temp) {
        setButtonPopup(true);
        setTitlePopup("sensor1 over temperature");
        setDataPopup(sensor1Data.temperature);
        
        const temperature = sensor1Data.temperature;
        addNotiTemp({ temperature });
        console.log(addNotiTemp({ temperature }));
      }
      if (sensor1Data.humidity > sensor1[0].moisture) {
        setButtonPopup(true);
        setTitlePopup("sensor1 over humidity");
        setDataPopup(sensor1Data.humidity);
        
        const humidity = sensor1Data.humidity;
        addNotiNumi({ humidity });
      }

      if (sensor2Data.temperature > sensor1[0].temp) {
        setButtonPopup(true);
        setTitlePopup("sensor2 over temperature");
        setDataPopup(sensor2Data.temperature);
        
        const temperature = sensor2Data.temperature;
        addNotiTemp({ temperature });
      }
      if (sensor2Data.humidity > sensor1[0].moisture) {
        setButtonPopup(true);
        setTitlePopup("sensor2 over humidity");
        setDataPopup(sensor2Data.humidity);
        
        const humidity = sensor2Data.humidity;
        addNotiNumi({ humidity });
      }
    }
  }, [
    sensor1,
    sensor1Data.temperature,
    sensor1Data.humidity,
    sensor1Data.flame,
    sensor2Data.temperature,
    sensor2Data.humidity,
    sensor2Data.flame,
    motionData.motion,
    
    addNotiNumi,
    addNotiTemp,
    addNotiLight,
    addNoticamera,

  ]);
  
  return (
    <>
      <div className="dash" style={{ width: "100%", height: "100%"}}>
        <DashHeader />
        <div
          className="dash-container"
          style={{ display: "flex", width: "100%"}}
        >
          <DashNav />
          
          <div className="dash-space" style={{ width: "100%",minHeight: "800px", backgroundColor: "#CACFD2"}}>
          {buttonPopup ? (
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              {titlePopup}
              <br></br>
              {dataPopup}
            </Popup>
          ) : (
            <></>
          )}
            <Outlet />
            {/* <Mainnoti/> */}
         
          </div>
        </div>
        <DashFooter />
      </div>
    </>
  );
};

export default DashLayout;
