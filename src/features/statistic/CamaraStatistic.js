import React from "react";
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ChartsWeek from "../../components/Chartsweek";
import ChartsMonth from "../../components/Chartyear";
import ChartDay from "../../components/Chartday";

import ChartLineYear from "../../components/ChartLineYear";
import ChartLineWeek from "../../components/ChartLineweek";
import ChartLineMonth from "../../components/ChartLineday";
const CamaraStatistic = () => {
  const [dataWeek, setDataWeek] = useState([]);
  const [dataDay, setDataDay] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [dataYear, setDataYear] = useState([]);

  const [selectedChart, setSelectedChart] = useState("Week");
  const [selectedOption, setSelectedOption] = useState("Bar");

  const chartRef = useRef(null);
  const [printWidth, setPrintWidth] = useState(1200);
  const [printHeight, setPrintHeight] = useState(800);

  useEffect(() => {
    fetchDataWeek();
    fetchDataMonth();
    fetchDataYear();
  }, []);

  const fetchDataWeek = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiCamera/chartByWeek",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setDataWeek(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataMonth = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiCamera/chartByDay",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setDataMonth(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiCamera/chartByMonth",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();
      setDataYear(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const toggleChart = (chart) => {
    setSelectedChart(chart);
  };

  const toggleOption = (option) => {
    setSelectedOption(option);
  };

  const updatePrintDimensions = () => {
    if (chartRef.current) {
      const { offsetWidth, offsetHeight } = chartRef.current;
      setPrintWidth(offsetWidth);
      setPrintHeight(offsetHeight);
    }
  };

  const handlePrint = () => {
    updatePrintDimensions();
    html2canvas(chartRef.current, {
      width: printWidth,
      height: printHeight,
      scrollX: 0,
      scrollY: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [printWidth, printHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, printWidth, printHeight);

      pdf.save("chart.pdf");
    });
  };

  return (
    <>
      <div className="chart">
        <div className="chart-content">
          <div className="buttons">
            <div className="btu-chart">
              <button
                onClick={() => toggleChart("Week")}
                className={selectedChart === "Week" ? "active" : ""}
              >
                Week
              </button>
            </div>
            <div className="btu-chart">
              <button
                onClick={() => toggleChart("Month")}
                className={selectedChart === "Month" ? "active" : ""}
              >
                Month
              </button>
            </div>
            <div className="btu-chart">
              <button
                onClick={() => toggleChart("Year")}
                className={selectedChart === "Year" ? "active" : ""}
              >
                Year
              </button>
            </div>

            <div className="print-button">
              <button onClick={handlePrint}>Print</button>
            </div>
          </div>
          <div className="all-content" ref={chartRef}>
            <div className="chart-title">
              <div className="chart-name">Camara Chart</div>
              <div className="method-chart">
                <div className="method">
                  <button
                    onClick={() => toggleOption("Bar")}
                    className={selectedOption === "Bar" ? "active" : ""}
                  >
                    Bar
                  </button>
                </div>
                <div className="method">
                  <button
                    onClick={() => toggleOption("Line")}
                    className={selectedOption === "Line" ? "active" : ""}
                  >
                    Line
                  </button>
                </div>
              </div>
            </div>

            <section
              className="ChartSection-Statistic"
              style={{ display: selectedChart === "Week" ? "block" : "none" }}
            >
              {selectedOption === "Bar" ? (
                <ChartsWeek data={dataWeek} width={1024} height={560} />
              ) : (
                <ChartLineWeek data={dataWeek} width={1024} height={560} />
              )}
            </section>
            <section
              className="ChartSection-Statistic"
              style={{ display: selectedChart === "Month" ? "block" : "none" }}
            >
              {selectedOption === "Bar" ? (
                <ChartDay data={dataMonth} width={1024} height={560} />
              ) : (
                <ChartLineMonth data={dataMonth} width={1024} height={560} />
              )}
            </section>
            <section
              className="ChartSection-Statistic"
              style={{ display: selectedChart === "Year" ? "block" : "none" }}
            >
              {selectedOption === "Bar" ? (
                <ChartsMonth data={dataYear} width={1024} height={560} />
              ) : (
                <ChartLineYear data={dataYear} width={1024} height={560} />
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default CamaraStatistic;
