import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../../../frontend/src/styles/chart.css"
const ChartLineWeek = ({ data , width, height }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
        
  // console.log(data.temperature);
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
        data: temp.map(item => item.value),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notifications Line By Week",
      },
      
    },
    maintainAspectRatio: false
  };

  const chartStyle = {
    width:0,
    height:0,
  };
  console.log(chartStyle);
  return (
    <div className="chart-item">
     
      <Line data={chartData} options={chartOptions} style={chartStyle}/>
    </div>
  );
};

export default ChartLineWeek;
