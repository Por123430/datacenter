import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

import "../../styles/monitor.css";
import humi from "../../img/humidity2.png";
import flame from "../../img/smoke-detector.png";
import close from "../../img/close.png"

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

  const [motionData, setMotionData] = useState();
  const [motiondd, setMotiontdd] = useState([]);
 

  const [currentPage, setCurrentPage] = useState(1);

  
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);



  const [title, setTitle] = useState();
  const fetchTempData = async () => {
    try {
      const response = await fetch("https://datacenter-api.onrender.com/notiTemp/filter");
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
      const response = await fetch("https://datacenter-api.onrender.com/notiHumi/filter");
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
      const response = await fetch("https://datacenter-api.onrender.com/notiLight/filter");
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

  const fetchMotionData = async () => {
    try {
      const response = await fetch("https://datacenter-api.onrender.com/notiCamera/filter");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch data");
      }

      const { noti_Motion, count } = data;

      setMotiontdd(noti_Motion);
      setMotionData(count);
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
      fetchMotionData();

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
      fetchMotionData();
      console.log("motiondd",motiondd);
    });
    if (sensor1.length > 0) {
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
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  
  const initialPopupData = popupData || [];
  const itemsPerPage = 5; 
  const totalItems = initialPopupData.length ?? 0;

  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  
  const indexOfLastItem = currentPage * itemsPerPage;

 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const currentItems = initialPopupData.slice(indexOfFirstItem, indexOfLastItem);

 
  const renderPageNumbers = pageNumbers.map((number) => {
    if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
      return (
        <li key={number}>
          <button
            id={number}
            onClick={handleClick}
            className={currentPage === number ? "active" : null}
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  // Update handlePrevbtn and handleNextbtn to use totalPages
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 < minpageNumberLimit) {
      setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxpageNumberLimit) {
      setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit);
    }
  };

  // Update disabled state of Previous and Next buttons
  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;
  const content = (
    <div>

      <section className="LogMonitor">
        <div className="LogMonitor-display">
          <div className="content-sensor">
            <div className="sensor">
              <div className="title">
                <div className="sensor_Titile">position: {position1Data}</div>
                <div className="sensor_Titile-model">sensor 1</div>
              </div>
              <div className="LogMonitor-display__content">
                <div className="LogMonitor-display__item1">

                  <div className="item-content">
                    <label>Temperature</label>


                  </div>
                  <div className="multi-graph margin">
                    <div style={{ color: 'black' }}>{sensor1Data.temperature} °C</div>
                    <div className="graph" data-name="" style={{ '--percentage': sensor1Data.temperature, '--fill': '#0669AD' }}></div>
                  </div>
                </div>
                <div className="LogMonitor-display__item1-under">
                  <div className="LogMonitor-display__item1-sub">
                    <div className="item-img">
                      <img src={humi} alt="imgtemp"></img>
                    </div>
                    <div className="item-content">
                      <label>Humidity</label>
                      <div className="data">{sensor1Data.humidity}</div>
                    </div>
                  </div>
                  <div className="LogMonitor-display__item1-sub">
                    <div className="item-img">
                      <img src={flame} alt="imgtemp"></img>
                    </div>
                    <div className="item-content">
                      <label>Smoke</label>
                      <div className="data">{detect(sensor1Data.flame)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sensor">
              <div className="title">
                <div className="sensor_Titile">position: {position2Data}</div>
                <div className="sensor_Titile-model">sensor 2</div>
              </div>
              <div className="LogMonitor-display__content">
                <div className="LogMonitor-display__item2">

                  <div className="item-content">
                    <label>Temperature</label>

                  </div>
                  <div className="multi-graph margin">
                    <div style={{ color: 'black' }}>{sensor2Data.temperature} °C</div>
                    <div className="graph" data-name="" style={{ '--percentage': sensor2Data.temperature, '--fill': '#0669AD' }}></div>
                  </div>
                </div>
                <div className="LogMonitor-display__item2-under">
                  <div className="LogMonitor-display__item2-sub">
                    <div className="item-img">
                      <img src={humi} alt="imgtemp"></img>
                    </div>
                    <div className="item-content">
                      <label>Humidity</label>
                      <div className="data">{sensor2Data.humidity}</div>
                    </div>
                  </div>
                  <div className="LogMonitor-display__item2-sub">
                    <div className="item-img">
                      <img src={flame} alt="imgtemp"></img>
                    </div>
                    <div className="item-content">
                      <label>Smoke</label>
                      <div className="data">{detect(sensor2Data.flame)}</div>
                    </div>
                  </div>
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
                <div class="title-content-Section">Notifications per day: Temperature</div>
                <div className="item-content-filter">{tempData}</div>
              </div>
              <div
                className="countSections"
                onClick={() => handlePopupClick(humidd, "Humidity")}
              >
                <div className="title-content-Section">Notifications per day: Humidity</div>
                <div className="item-content-filter">{humiData}</div>
              </div>
              <div
                className="countSections"
                onClick={() => handlePopupClick(lightdd, "Smoke")}
              >
                <div className="title-content-Section">Notifications per day: Smoke</div>
                <div className="item-content-filter">{lightData}</div>
              </div>
              <div
                className="countSections"
                onClick={() => handlePopupClick(motiondd, "Motion")}
              >
                <div className="title-content-Section">Notifications per day: Motion</div>
                <div className="item-content-filter">{motionData}</div>
              </div>
            </div>
          </div>
          {isPopupOpen && (
            <div className="overlay">
              <div className="popupData">
                <div className="content-close-icon">
                  <button className="close" onClick={closePopupClick} >
                    <img src={close} alt="close-icon" className="close-icon"></img>
                  </button>
                </div>

                <div className="content">
                  {/* Display popupData here */}
                  <div className="table-showData">
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
                      {/* <tbody>
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
                    </tbody> */}

                      <tbody>
                        {currentItems.map((dataItem, index) => (
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
                  <div className="pagination-page">
                    <div className="content-pg">
                      <li className="btn-pg-li">
                        <button
                          onClick={handlePrevbtn}
                          disabled={isPrevButtonDisabled}
                        >
                          Prev
                        </button>
                      </li>
                      {/* {renderPageNumbers} */}
                      <li className="btn-pg-li">
                        <button
                          onClick={handleNextbtn}
                          disabled={isNextButtonDisabled}
                        >
                          Next
                        </button>
                      </li>
                    </div>
                  </div>
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
