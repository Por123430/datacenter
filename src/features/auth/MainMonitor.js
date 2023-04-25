import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

import "../../styles/monitor.css";

import temp from "../../img/celsius.png";
import humi from "../../img/humidity2.png";
import flame from "../../img/smoke-detector.png";
const MainMonitor = () => {
  const [sensor1Data, setSensor1Data] = useState([]);
  const [sensor2Data, setSensor2Data] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "ESP32/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor1Data(data);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "ESP32-Device2/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setSensor2Data(data);
    });
  }, []);
  function detect(x) {
    if (x === 0) {
      x = "detect";
    } else {
      x = "undetect";
    }
    return x;
  }
  const content = (
    <div>
      <section className="LogMonitor">
        <div className="LogMonitor-display">
          <div className="LogMonitor-display__content">
            <div className="LogMonitor-display__item1">
              <div className="item-img">
                <img src={temp} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 1 : Temperature</label>
                {sensor1Data.temperature}
              </div>

              {/* {imageData.photo} */}
            </div>
            <div className="LogMonitor-display__item1">
              <div className="item-img">
                <img src={humi} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 1 : Humidity</label>
                {sensor1Data.humidity}
              </div>
            </div>
            <div className="LogMonitor-display__item1">
              <div className="item-img">
                <img src={flame} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 1 : flame</label>
                {detect(sensor1Data.flame)}
              </div>
            </div>
          </div>

          <div className="LogMonitor-display__content">
            <div className="LogMonitor-display__item2">
              <div className="item-img">
                <img src={temp} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 2 : Temperature</label>
                {sensor2Data.temperature}
              </div>
            </div>
            <div className="LogMonitor-display__item2">
              <div className="item-img">
                <img src={humi} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 2 : Humidity</label>
                {sensor2Data.humidity}
              </div>
            </div>
            <div className="LogMonitor-display__item2">
              <div className="item-img">
                <img src={flame} alt="imgtemp"></img>
              </div>
              <div className="item-content">
                <label>sensor 2 : flame</label>
                {detect(sensor2Data.flame)}
              </div>
            </div>
          </div>

          <div className="LogMonitor-display__graph">
            <div className="graph-item">
              <iframe
                title="all-temp"
                style={{
                  // background: "#21313C",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                }}
                width="410"
                height="340"
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=6436b21b-53c5-4233-8a6a-28600d299260&maxDataAge=300&theme=light&autoRefresh=true"
              ></iframe>
            </div>

            <div className="graph-item">
              <iframe
                title="all-humi"
                style={{
                  // background: "#21313C",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                }}
                width="410"
                height="340"
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643847dc-f155-4b1b-8b1f-cc909507c2c8&maxDataAge=300&theme=light&autoRefresh=true"
              ></iframe>
            </div>

            <div className="graph-item">
              <iframe
                title="all-humi"
                style={{
                  // background: "#21313C",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                }}
                width="410"
                height="340"
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64385fdb-2306-41ec-8042-eb1084ff92af&maxDataAge=300&theme=light&autoRefresh=true"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  return content;
};

export default MainMonitor;
