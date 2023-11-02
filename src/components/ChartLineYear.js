import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../styles/chart.css";
const ChartLineYear = ({ data , monitor}) => {
  const [temp, setTemp] = useState([]);
  const [show, setShow] = useState("chart-item");
  useEffect(() => {
    console.log(monitor);
    setTemp(data);
    if(monitor) {
      setShow('chart-item-monitor')
    }
  }, [data, monitor]);
  

  const chartData = {
    labels: temp.map((item) => item.month), // Assuming you have a "week" property in your data
    datasets: [
      {
        label: "Notifications Values",
        backgroundColor: [
          
          "#c45850",
        ],
        data: temp.map((item) => item.value),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notifications Line By Year",
      },
      
    },
  };

  const chartStyle = {
    height: 720,
    width:480,
  };

  return (
    <div className={show}>
     
      <Line data={chartData} options={chartOptions} style={chartStyle}/>
    </div>
  );
};
export default ChartLineYear;
