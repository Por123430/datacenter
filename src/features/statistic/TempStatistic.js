import React from "react";
import "../../styles/graph.css";
import { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";
const TempStatistic = () => {
  // const [chartImage, setChartImage] = useState(null);

  // // Function to download the chart as a PDF
  // const downloadPDF = () => {
  //   // Get the chart element from the iframe
  //   const iframe = document.getElementById('iframe1');
  //   // const chart = iframe.contentDocument.getElementById('chart-element');
  //   // Get the image data from the chart
  //   const imageData = iframe.toDataURL('image/png');

  //   // Create a new PDF document
  //   const pdf = new jsPDF('landscape');

  //   // Add the image to the PDF
  //   pdf.addImage(imageData, 'PNG', 10, 10, 280, 150);

  //   // Save the PDF file
  //   pdf.save('chart.pdf');
  // }

  // const [isLoading, setIsLoading] = useState(true);

  // const handleMessage = (event) => {
  //   if (event.data.action === "iframe1-loaded") {
  //     setIsLoading(false);
  //   }
  // };

  // const printIframe = (id) => {
  //   const iframe = document.frames
  //     ? document.frames[id]
  //     : document.getElementById(id);
  //   const iframeWindow = iframe.contentWindow || iframe;

  //   iframe.focus();
  //   iframeWindow.print();

  //   return false;
  // };

  // useEffect(() => {
  //   window.addEventListener("message", handleMessage);

  //   return () => {
  //     window.removeEventListener("message", handleMessage);
  //   };
  // }, []);
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
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=6436b21b-53c5-4233-8a6a-28600d299260&maxDataAge=3600&theme=light&autoRefresh=true"
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
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643834e0-5761-4a13-82a8-ffbdfbe8d7ea&maxDataAge=3600&theme=light&autoRefresh=true"
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
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643836cf-f155-475b-8429-cc9095f4e873&maxDataAge=3600&theme=light&autoRefresh=true"
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
                src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=643838db-5761-4715-8278-ffbdfbef9996&maxDataAge=3600&theme=light&autoRefresh=true"
              ></iframe>
            </div>
        </div>
        <div className='print-button'>
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

export default TempStatistic;
