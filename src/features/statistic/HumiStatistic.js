import React from "react";
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
import ChartsWeek from "../../components/Chartsweek";
import ChartsMonth from "../../components/Chartyear";
import ChartDay from "../../components/Chartday";

import ChartLineYear from "../../components/ChartLineYear";
import ChartLineWeek from "../../components/ChartLineweek";
import ChartLineMonth from "../../components/ChartLineday";
const HumiStatistic = () => {
  const [data, setData] = useState([]);
  const [dataDay, setDataDay] = useState([]);
  const [dataYear, setDataYear] = useState([]);

  const [showWeekChart, setShowWeekChart] = useState(true);
  const [showDayChart, setShowDayChart] = useState(false);
  const [showMonthChart, setShowMonthChart] = useState(false);

  const [showLineWeekChart, setShowLineWeekChart] = useState(false);
  const [showLineMonthChart, setShowLineMonthChart] = useState(false);
  const [showLineYearChart, setShowLineYearChart] = useState(false);
  const [options, setOptions] = useState(1);

  const [barButtonClicked, setBarButtonClicked] = useState(false);
  const [lineButtonClicked, setLineButtonClicked] = useState(false);
  const toggleWeekChart = () => {
    if (options === 1) {
      setShowWeekChart(true);
      setShowDayChart(false);
      setShowMonthChart(false);
      setShowLineMonthChart(false);
      setShowLineYearChart(false);
      setShowLineWeekChart(false);
    } else {
      setShowWeekChart(false);
      setShowDayChart(false);
      setShowMonthChart(false);
      setShowLineMonthChart(false);
      setShowLineYearChart(false);
      setShowLineWeekChart(true);
    }
  };

  const toggleDayChart = () => {
    if (options === 1) {
      setShowWeekChart(false);
      setShowDayChart(true);
      setShowMonthChart(false);
      setShowLineMonthChart(false);
      setShowLineYearChart(false);
      setShowLineWeekChart(false);
    } else {
      setShowWeekChart(false);
      setShowDayChart(false);
      setShowMonthChart(false);
      setShowLineMonthChart(true);
      setShowLineYearChart(false);
      setShowLineWeekChart(false);
    }
  };
  const toggleMonthChart = () => {
    if (options === 1) {
      setShowWeekChart(false);
      setShowDayChart(false);
      setShowMonthChart(true);
      setShowLineMonthChart(false);
      setShowLineYearChart(false);
      setShowLineWeekChart(false);
    } else {
      setShowWeekChart(false);
      setShowDayChart(false);
      setShowMonthChart(false);
      setShowLineMonthChart(false);
      setShowLineYearChart(true);
      setShowLineWeekChart(false);
    }
  };

  const toggleBar = () => {
    setOptions(1);
    setBarButtonClicked(true);
    setLineButtonClicked(false);
  
  };

  const toggleLine = () => {
    setOptions(2);
    setBarButtonClicked(false);
    setLineButtonClicked(true);
  
  };

  useEffect(() => {
    fetchData();
    fetchDataDay();
    fetchDataYear();

    // Determine which chart to show based on options
    if (options === 1) {
      toggleBar(); // For example, set the initial chart to Bar
    } else {
      toggleLine(); // Or set it to Line
    }
  }, [options]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/notiHumi/chartByWeek"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/notiHumi/chartByMonth"
      );
      const result = await response.json();
      setDataYear(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataDay = async () => {
    try {
      const response = await fetch("http://localhost:3500/notiHumi/chartByDay");
      const result = await response.json();
      setDataDay(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const chartRef = useRef(null);
  const [pauseDataUpdates, setPauseDataUpdates] = useState(false);

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
              <button
                onClick={toggleWeekChart}
                className={showWeekChart ? "active" : ""}
              >
                Week
              </button>
            </div>
            <div className="btu-chart">
              <button
                onClick={toggleDayChart}
                className={showDayChart ? "active" : ""}
              >
                Month
              </button>
            </div>
            <div className="btu-chart">
              <button
                onClick={toggleMonthChart}
                className={showMonthChart ? "active" : ""}
              >
                Year
              </button>
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
            <div className="chart-title">
              Humidity Chart
              <div className="method-chart">
                <div className="method">
                  <button
                    onClick={toggleBar}
                    className={barButtonClicked ? "active" : ""}
                  >
                    Bar
                  </button>
                </div>
                <div className="method">
                  <button
                    onClick={toggleLine}
                    className={lineButtonClicked ? "active" : ""}
                  >
                    Line
                  </button>
                </div>
              </div>
            </div>
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
            <section
              className="ChartSection"
              style={{ display: showLineYearChart ? "block" : "none" }}
            >
              <ChartLineYear data={dataYear} />
            </section>
            <section
              className="ChartSection"
              style={{ display: showLineMonthChart ? "block" : "none" }}
            >
              <ChartLineMonth data={dataDay} />
            </section>
            <section
              className="ChartSection"
              style={{ display: showLineWeekChart ? "block" : "none" }}
            >
              <ChartLineWeek data={data} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HumiStatistic;
