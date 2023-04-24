import React from "react";
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
const LightStatistic = () => {
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
      <div className="chart">
        <div className="LogMonitor-display__graph">
          <div className="graph-item">
            <iframe
              id="iframe1"
              title="iframe1"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="480"
              height="360"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64385fdb-2306-41ec-8042-eb1084ff92af&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </div>

          <div className="graph-item">
            <iframe
              id="iframe1"
              title="iframe1"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="480"
              height="360"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=6438604b-5949-4a4c-871d-f40344f79ecd&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </div>

          <div className="graph-item">
            <iframe
              ref={chartRef}
              id="iframe1"
              title="iframe1"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="480"
              height="360"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643860ae-2306-4210-856a-eb1084007ea9&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </div>

          <div className="graph-item">
            <iframe
              id="iframe1"
              title="iframe1"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="480"
              height="360"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64386143-66b9-4543-8c68-d21f884eea3b&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
          </div>
        </div><div className='print-button'>
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
    </>
  );
};

export default LightStatistic;
