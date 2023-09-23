import React from "react";
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
import ChartsWeek from "../../components/Chartsweek";
import ChartsMonth from "../../components/Chartyear";
import ChartDay from "../../components/Chartday";
const LightStatistic = () => {
  const chartRef = useRef(null);
  const [pauseDataUpdates, setPauseDataUpdates] = useState(false);
  const [data,setData] = useState([]);
  const [dataDay,setDataDay] = useState([]);
  const [dataYear,setDataYear] = useState([]);
 
  const [showWeekChart, setShowWeekChart] = useState(true);
  const [showDayChart, setShowDayChart] = useState(false);
  const [showMonthChart, setShowMonthChart] = useState(false);

  const toggleWeekChart = () => {
    setShowWeekChart(true);
    setShowDayChart(false);
    setShowMonthChart(false);
  };

  const toggleDayChart = () => {
    setShowWeekChart(false);
    setShowDayChart(true);
    setShowMonthChart(false);
  };

  const toggleMonthChart = () => {
    setShowWeekChart(false);
    setShowDayChart(false);
    setShowMonthChart(true);
  };
  useEffect(() => {
    fetchData();
    fetchDataDay()
    fetchDataYear();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://datacenter-api.onrender.com/notiLight/chartByWeek");
      const result = await response.json();
      setData(result); 
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataYear = async () => {
    try {
      const response = await fetch("https://datacenter-api.onrender.com/chartByMonth");
      const result = await response.json();
      setDataYear(result); 
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataDay = async () => {
    try {
      const response = await fetch("https://datacenter-api.onrender.com/notiLight/chartByDay");
      const result = await response.json();
      setDataDay(result); 
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const handleBeforePrint = () => {
    setPauseDataUpdates(true);
  };

  const handleAfterPrint = () => {
    setPauseDataUpdates(false);
  };
  return (
    <>
      <div className="chart" ref={chartRef}>
        <div className="chart-content">
          <div className="buttons">
            <div className="btu-chart">
              <button onClick={toggleWeekChart}>Week</button>
            </div>
            <div className="btu-chart">
              <button onClick={toggleDayChart}>Month</button>
            </div>
            <div className="btu-chart">
              <button onClick={toggleMonthChart}>Year</button>
            </div>
            <div className="print-button">
          <ReactToPrint
            trigger={() => <button>Print</button>}
            content={() => chartRef.current}
            onBeforeGetContent={handleBeforePrint}
            onAfterPrint={handleAfterPrint}
          />
        </div>
        <style>{`
       .mongodb-chart-refreshing {
         animation: none !important;
       }
       @page {
         size: landscape;
         size: 280mm 180mm;
       }
     `}</style>
        {pauseDataUpdates && (
          <style>{`
         .mongodb-chart-refreshing {
           animation: none !important;
         }
       `}</style>
        )}
          </div>
          <div className="all-content">
            {" "}
            <div className="chart-title">Flame Chart</div>
            <section
              className="ChartSection"
              style={{ display: showWeekChart ? "block" : "none" }}
            >
              <ChartsWeek data={data} />
            </section>
            <section
              className="ChartSection"
              style={{ display: showDayChart ? "block" : "none" }}
            >
              <ChartDay data={dataDay} />
            </section>
            <section
              className="ChartSection"
              style={{ display: showMonthChart ? "block" : "none" }}
            >
              <ChartsMonth data={dataYear} />
            </section>
          </div>
         
        </div>
     
      </div>
    </>
  );
};
export default LightStatistic;
