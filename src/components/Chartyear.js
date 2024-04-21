import React from "react";
import { Bar } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../styles/chart.css";
const ChartsMonth = ({ data , width, height}) => {
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    setTemp(data);
  }, [data]);

  const chartData = {
    labels: temp.map((item) => item.month), // Assuming you have a "week" property in your data
    datasets: [
      {
        label: "Notifications Count",
        backgroundColor: [
         
          "#c45850",
        ],
        data: temp.map((item) => item.Count),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notifications By Year",
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
      <Bar data={chartData} options={chartOptions}style={chartStyle} />
    </div>
  );
};

export default ChartsMonth;
