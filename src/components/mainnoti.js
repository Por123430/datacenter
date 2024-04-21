import React from "react";
import { Link } from "react-router-dom";
import NotihumiList from "../features/notification/noti_humi/NotihumiList";
import NotiHeader from "./NotiHeader";
import { Outlet } from "react-router-dom";

const mainnoti = () => {
  return (
    <>
      <div>
      <div className="all-title-content" style={{
    background: "#F4F4EF",
    fontSize: "1.4rem",
    padding: "20px 70px",
    color: "black",
    boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
  }}>Notifications</div>
        <div className="mainnoti-NotiHeader" style={{margin: "50px 10%", width: "80%"}}>
          <NotiHeader />
        </div>
        <div className="mainnoti-Outlet" >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default mainnoti;
