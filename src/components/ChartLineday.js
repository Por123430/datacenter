import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../styles/chart.css"
const ChartLineDay = ({ data, width, height }) => {
  // console.log(data.temperature);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
        
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    setTemp(data);
  }, [data]);
 
  const chartData = {
    labels: temp.map(item => `${item.day}/${currentMonth}/${currentYear}`), // Assuming you have a "week" property in your data
    datasets: [
      {
        label: "Notifications Values",
        backgroundColor: [
        
          "#c45850",
        ],
        data: temp.map(item => item.Count),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notifications Line By Month",
      },
      
    },
  };

  const chartStyle = {
    width,
    height,
  };
  return (
    <div className="chart-item">
      {/* {" "} */}
      {/* Set desired width and height */}
      <Line data={chartData} options={chartOptions}  style={chartStyle}/>
    </div>
  );
};

export default ChartLineDay;
