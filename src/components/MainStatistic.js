import React from "react";
import StatisticHeader from "./StatisticHeader";
import { Outlet } from "react-router-dom";
import ReactToPtint, { useReactToPrint } from "react-to-print";
import { useRef, useEffect, useState } from "react";
export const MainStatistic = () => {
  const [focusRef, setFocusRef] = useState(null);


  return (
    <>
      <div>
      <div className="all-title-content" style={{
    background: "#F4F4EF",
    fontSize: "1.4rem",
    padding: "20px 70px",
    color: "black",
    boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
  }}>Statistic</div>
        <div
          className="mainnoti-NotiHeader"
          style={{ margin: "50px 10%", width: "80%" }}
        >
          <StatisticHeader />
        </div>
        <div className="mainnoti-Outlet"  style={{margin: "0px 10%", width: "80%" ,backgroundColor: "wheat"}}>
          <Outlet />
          
          {/* <button onClick={handleClick} disabled={loading}> Print It </button> */}
        </div>
        
        <div>{/* <button onClick={handlePrint}>Print</button> */}</div>
      </div>
    </>
  );
};
export default MainStatistic;
