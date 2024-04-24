import React, { useState } from "react";
import "../styles/DashHeader.css";

import Logo from "../img/Egat-Logo.png";
import userTitle1 from "../img/userTitle1.png";
import userTitle2 from "../img/userTitle2.png";
import power from "../img/power.png";
import editProfile from "../img/user-avatar.png";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { username, status, roles, firstname, lastname, _id } = useAuth();
  // const user = { username, status, roles, firstname, lastname, _id }
  // console.log("_id", _id);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }
  const handleEdit = () => navigate(`/dash/EditProfile/${_id}`);
  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <nav className="dash-header__logo">
          <img src={Logo} alt="Logo"></img>
        </nav>
        <p style={{ color: "#154295" }}>
          {dateState.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </p>
        <div className="title-user-data">
          <div className="user-data">
            <div className="dash-title" onClick={toggleDropdown}>
              <div className="title-img">
                <img
                  src={userTitle1}
                  alt="userTitle1"
                  className="user-title"
                ></img>
              </div>
              <div className="title-span">
                <div className="title">{username}</div>
                <div className="title-under">Status: {roles + ""}</div>
              </div>
            </div>
            {/* {dropdownOpen && ( */}
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleEdit}>
                  Edit Profile
                  <img
                    src={editProfile}
                    alt="editProfile"
                    className="editProfile"
                  ></img>
                </li>

                <li onClick={onLogoutClicked}>
                  Logout
                  <img src={power} alt="power" className="power"></img>
                </li>
              </ul>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;
