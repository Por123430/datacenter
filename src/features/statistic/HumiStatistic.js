import React from 'react'
import ReactToPrint from "react-to-print";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";

const HumiStatistic = () => {
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643847dc-f155-4b1b-8b1f-cc909507c2c8&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64384825-3752-4a65-8312-8b986aefe36f&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64384a70-0157-498c-80a9-f8302853051d&maxDataAge=3600&theme=light&autoRefresh=true"
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=64384baf-6e4c-4149-80f0-d20391f4ac98&maxDataAge=3600&theme=light&autoRefresh=true"
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

export default HumiStatistic