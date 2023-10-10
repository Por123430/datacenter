import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

import "../../styles/monitor.css";

import temp from "../../img/celsius.png";
import humi from "../../img/humidity2.png";
import flame from "../../img/smoke-detector.png";

import { useSelector } from "react-redux";
import { selectAllSensor } from "../sensor/sensorApiSlice";

const MainMonitor = () => {
  const sensor1 = useSelector((state) => selectAllSensor(state));

  const [sensor1Data, setSensor1Data] = useState([]);
  const [sensor2Data, setSensor2Data] = useState([]);
  const [position1Data, setPosition1Data] = useState([]);
  const [position2Data, setPosition2Data] = useState([]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const [tempData, setTempData] = useState();
  const [humiData, setHumiData] = useState();
  const [lightData, setLightData] = useState();
  const [tempdd, setTempdd] = useState([]);
  const [humidd, setHumidd] = useState([]);
  const [lightdd, setLightdd] = useState([]);

  const [title, setTitle] = useState();
  const fetchTempData = async () => {
    try {
      const response = await fetch("http://localhost:3500/notiTemp/filter", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          // Add any other headers you need here
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      const { noti_temp, count } = data;

      setTempdd(noti_temp);
      setTempData(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchHumiData = async () => {
    try {
      const response = await fetch("http://localhost:3500/notiHumi/filter", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          // Add any other headers you need here
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      const { noti_humi, count } = data;

      setHumidd(noti_humi);
      setHumiData(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLightData = async () => {
    try {
      const response = await fetch("http://localhost:3500/notiLight/filter", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          // Add any other headers you need here
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      const { noti_light, count } = data;

      setLightdd(noti_light);
      setLightData(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePopupClick = (data, title) => {
    setTitle(title);
    setPopupData(data);
    setPopupOpen(!isPopupOpen);
  };
  const closePopupClick = () => {
    setPopupOpen(false);
    setPopupData(null);
  };
  useEffect(() => {
    const starCountRef = ref(db, "ESP32/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor1Data(data);
      fetchTempData();
      fetchHumiData();
      fetchLightData();
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "ESP32-Device2/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor2Data(data);
      fetchTempData();
      fetchHumiData();
      fetchLightData();
    });
    if(sensor1.length>0){
      setPosition1Data(sensor1[0].position);
      setPosition2Data(sensor1[1].position);
    }
  }, [sensor1]);
  function detect(x) {
    if (x === 1) {
      x = "undetect";
    } else {
      x = "detect";
    }
    return x;
  }

  const time = (tt) => {
    const date = new Date(tt);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };
  const content = (
    <div>
      <section className="LogMonitor">
        <div className="LogMonitor-display">
          <div className="sensor">
            <div className="sensor_Titile">position: {position1Data}</div>
            <div className="LogMonitor-display__content">
              <div className="LogMonitor-display__item1">
                <div className="item-img">
                  <img src={temp} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 1 : Temperature</label>

                  <div className="data">{sensor1Data.temperature}</div>
                </div>
              </div>
              <div className="LogMonitor-display__item1">
                <div className="item-img">
                  <img src={humi} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 1 : Humidity</label>
                  <div className="data">{sensor1Data.humidity}</div>
                </div>
              </div>
              <div className="LogMonitor-display__item1">
                <div className="item-img">
                  <img src={flame} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 1 : Smoke</label>
                  <div className="data">{detect(sensor1Data.flame)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sensor">
            <div className="sensor_Titile">position: {position2Data}</div>
            <div className="LogMonitor-display__content">
              <div className="LogMonitor-display__item2">
                <div className="item-img">
                  <img src={temp} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 2 : Temperature</label>
                  <div className="data"> {sensor2Data.temperature}</div>
                </div>
              </div>
              <div className="LogMonitor-display__item2">
                <div className="item-img">
                  <img src={humi} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 2 : Humidity</label>
                  <div className="data">{sensor2Data.humidity}</div>
                </div>
              </div>
              <div className="LogMonitor-display__item2">
                <div className="item-img">
                  <img src={flame} alt="imgtemp"></img>
                </div>
                <div className="item-content">
                  <label>sensor 2 : Smoke</label>
                  <div className="data">{detect(sensor2Data.flame)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="LogMonitor-display__content">
            <div className="Monitor-display__graph">
              <div
                className="countSections"
                onClick={() => handlePopupClick(tempdd, "Temperature")}
              >
                <div class="title-content-Section">Temperature</div>
                <div className="item-content-filter">{tempData}</div>
              </div>
              <div
                className="countSections"
                onClick={() => handlePopupClick(humidd, "Humidity")}
              >
                <div className="title-content-Section">Humidity</div>
                <div className="item-content-filter">{humiData}</div>
              </div>
              <div
                className="countSections"
                onClick={() => handlePopupClick(lightdd, "flame")}
              >
                <div className="title-content-Section">Smoke</div>
                <div className="item-content-filter">{lightData}</div>
              </div>
            </div>
          </div>
          {isPopupOpen && (
            <div className="overlay">
              <div className="popupData">
                <button className="close" onClick={closePopupClick}>
                  x
                </button>
                <div className="content">
                  {/* Display popupData here */}
                  <table className="table-monitor">
                    <thead className="table__thead">
                      <tr>
                        <th scope="col" className="table__th-temp">
                          {title}
                        </th>
                        <th scope="col" className="table__th-moistures">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {popupData.map((dataItem, index) => (
                        <tr key={index} className="table-allcell">
                          <td>
                            {" "}
                            {dataItem.temperature ||
                              dataItem.humidity ||
                              dataItem.flame}
                          </td>
                          <td> {time(dataItem.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
  return content;
};

export default MainMonitor;
