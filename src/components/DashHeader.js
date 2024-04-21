import React from "react";
import "../styles/DashHeader.css";
import Logo from "../img/Egat-Logo.png";

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link, useLocation } from "react-router-dom"

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const DashHeader = () => {
  const { username, status, roles, firstname, lastname } = useAuth();
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const onLogoutClicked = () => sendLogout()

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  let dashClass = null
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }

  const logoutButton = (
    <button
      className="icon-button"
      title="logout"
      onClick={onLogoutClicked}
    >
      LOGOUT
    </button>
  )
  const content = (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <nav className="dash-header__logo">
          <img src={Logo} alt="Logo"></img>
        </nav>

        {/* <Link to="/dash/notes" className="dash-header__title" >
          DataCenter
        </Link> */}
        <p style={{ color: "#154295" }}>
          {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })}
        </p>
        <div  className="title-user-data">
          <div className="user-data">
            <div className="dash-title">
              {/* {goHomeButton} */}
              <div className="title">
                User: {firstname + '  ' + lastname}
              </div>
              <div className="title-under">
              Status: {roles + ""}
              </div>
            </div>
          </div>
          <div className="dash-header_logout-button">
            {logoutButton}
          </div>
        </div>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;
