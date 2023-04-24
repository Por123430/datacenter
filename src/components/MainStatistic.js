import React from "react";
import StatisticHeader from "./StatisticHeader";
import { Outlet } from "react-router-dom";
import ReactToPtint, { useReactToPrint } from "react-to-print";
import { useRef, useEffect, useState } from "react";
export const MainStatistic = () => {
  const [focusRef, setFocusRef] = useState(null);

  // useEffect(() => {
  //   if(!focusRef) return;
    
  //   focusRef.focus();
  // }, [focusRef]);
  //   const printRef = useRef();
    
  //   const [loading, setLoading] = useState(false);
  
  //   const handleClick = useReactToPrint({
  //     content: () => focusRef
  //   });
  // const componentRef = useRef();
  // const [pinCode, setPinCode] = React.useState("");
  // useEffect(()=>{

  //     })
  // const handlePrint = useReactToPrint({
  //   content: () =>  componentRef.current,

  //   documentTitle: "Statistic-data",
  //   // onAfterPrint: () => alert('Print success')
  // },10000);
  //  useEffect(()=>{

  //   const getData = setTimeout(() => {
  //     componentRef.current = 5000;

  //   }, 5000)
  //   return () => clearTimeout(getData)

  //  })

  return (
    <>
      <div>
        <div
          className="mainnoti-NotiHeader"
          style={{ margin: "50px 10%", width: "80%" }}
        >
          <StatisticHeader />
        </div>
        <div className="mainnoti-Outlet"  style={{margin: "0px 10%", width: "100%"}}>
          <Outlet />
          
          {/* <button onClick={handleClick} disabled={loading}> Print It </button> */}
        </div>
        
        <div>{/* <button onClick={handlePrint}>Print</button> */}</div>
      </div>
    </>
  );
};
export default MainStatistic;
