import React from 'react'
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
const CamaraStatistic = () => {
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643e253b-33e4-4d63-8ffb-4dfb0a517ee4&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643e25c0-64f7-4adc-8986-0988dc9e97d5&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643e25fe-42a8-4758-80f2-3a49547800df&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643e2657-63fa-4aa3-85be-63a8af30611e&maxDataAge=3600&theme=light&autoRefresh=true"
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
  )
}

export default CamaraStatistic