import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashNav.css";
import useAuth from "../hooks/useAuth";
import addUser from "../img/addUser.png";
import notification from "../img/notification.png";

import editSensors from "../img/editSensors.png";
import monitor from "../img/monitors.png";
import LogMonitor from "../img/logMonitor.png";
import statistic from "../img/statistic.png";
import user from "../img/user.png";

const DashNav = () => {
  const { isAdmin, isOfficer } = useAuth();
  const content = (
    <div className="dash-nav">
      <div className="dash-nav__container">
        <div className="dash-nav__element">
          {(!isAdmin || isOfficer) && (
            <Link to="/dash" className="dash-nav__link">
              <div class="dropdown">
                <img src={monitor} alt="monitor"></img>
                <div class="dropdown-content">Monitor</div>
              </div>
            </Link>
          )}
        </div>

        <div className="dash-nav__element">
          {(!isAdmin || isOfficer) && (
            <Link to="/dash/LogMonitors" className="dash-nav__link">
              <div class="dropdown">
                <img src={LogMonitor} alt="LogMonitor"></img>
                <div class="dropdown-content">Log Monitor</div>
              </div>
            </Link>
          )}
        </div>
        {/* <div className="dash-nav__element">
        {(!isAdmin || isOfficer) && <Link to="/dash/LogUser" className="dash-nav__link">
        <img src={addUser} alt="addUser"></img>
          Log User
          
        </Link>}
        </div> */}

        <div className="dash-nav__element">
          {(!isAdmin || isOfficer) && (
            <Link
              to="/dash/MainStistic/TempStatistic"
              className="dash-nav__link"
            >
              <div class="dropdown">
                <img src={statistic} alt="statistic"></img>
                <div class="dropdown-content">Statistics</div>
              </div>
            </Link>
          )}
        </div>

        <div className="dash-nav__element">
          {(!isAdmin || isOfficer) && (
            <Link to="/dash/Mainnoti/NotitempList" className="dash-nav__link">
              <div class="dropdown">
                <img src={notification} alt="notification"></img>

                <div class="dropdown-content">Notification</div>
              </div>
            </Link>
          )}
        </div>

        <div className="dash-nav__element">
          {(isAdmin || isOfficer, isAdmin) && (
            <Link to="/dash/users" className="dash-nav__link">
              <div class="dropdown">
                <img src={user} alt="user"></img>
                <div class="dropdown-content">Users</div>
              </div>
            </Link>
          )}
        </div>

        <div className="dash-nav__element">
          {(isAdmin || isOfficer, isAdmin) && (
            <Link to="/dash/users/new" className="dash-nav__link">
              <div class="dropdown">
                <img src={addUser} alt="addUser"></img>
                <div class="dropdown-content">Add User</div>
              </div>
            </Link>
          )}
        </div>

        <div className="dash-nav__element">
          {(isAdmin && isOfficer, isAdmin) && (
            <Link to="/dash/Sensor" className="dash-nav__link">
              <div class="dropdown">
                <img src={editSensors} alt="editSensors"></img>
                <div class="dropdown-content">Edit sensor</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
  return content;
};

export default DashNav;
