import React from 'react'
import '../../styles/chart.css'
const Satistic = () => {
  return (
    <div className="chart">
      <div className="LogMonitor-display__graph">
            <div className="graph-item">
            <iframe
              title="all-temp"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="420"
              height="340"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=642d309b-72d2-4eda-8cae-83480f3982f0&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
            </div>
            
            <div className="graph-item">
            <iframe
              title="all-humi"
              style={{
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              }}
              width="420"
              height="340"
              src="https://charts.mongodb.com/charts-arduinoproject-dvaqg/embed/charts?id=642d3370-b95e-45c7-82c7-33ed69bac748&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe>
            </div>
           
          </div>
    </div>
    
  )
}

export default Satistic