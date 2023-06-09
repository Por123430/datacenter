import React from "react";
import { Link } from "react-router-dom";
import NotihumiList from "../features/notification/noti_humi/NotihumiList";
import NotiHeader from "./NotiHeader";
import { Outlet } from "react-router-dom";

const mainnoti = () => {
  return (
    <>
      <div>
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
