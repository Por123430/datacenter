import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotiHeader.css";

import temp from "../img/temp.png";
import motion from "../img/motion.png";

import humi from "../img/humidity2.png";
import flame from "../img/smoke-detector.png";
const StatisticHeader = () => {
  const content = (
    <div className="NotiHeader__element">
      <Link to="/dash/MainStistic/TempStatistic" className="NotiHeader-link">
        <div className="NotiHeader-link-content">
          <div className="NotiHeader-link__img">
            <img src={temp} alt="monitor"></img>
          </div>
          <div className="NotiHeader-link__title">temperature</div>
        </div>
      </Link>
      <Link to="/dash/MainStistic/HumiStatistic" className="NotiHeader-link">
        <div className="NotiHeader-link-content">
          <div className="NotiHeader-link__img">
            <img src={humi} alt="monitor"></img>
          </div>
          <div className="NotiHeader-link__title">humidity</div>
        </div>
      </Link>

      <Link to="/dash/MainStistic/LightStatistic" className="NotiHeader-link">
        <div className="NotiHeader-link-content">
          <div className="NotiHeader-link__img">
            <img src={flame} alt="monitor"></img>
          </div>
          <div className="NotiHeader-link__title">flame</div>
        </div>
      </Link>
      <Link to="/dash/MainStistic/CamaraStatistic" className="NotiHeader-link">
        <div className="NotiHeader-link-content">
          <div className="NotiHeader-link__img">
            <img src={motion} alt="monitor"></img>
          </div>
          <div className="NotiHeader-link__title">motion</div>
        </div>
      </Link>
    </div>
  );
  return content;
};

export default StatisticHeader;
