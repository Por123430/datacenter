import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../styles/chart.css";

const ChartLineYear = ({ data, width, height }) => {
  const [temp, setTemp] = useState([]);
 
  useEffect(() => {
    
    setTemp(data);
    
  }, [data]);
  const chartData = {
    labels: temp.map((item) => item.month),
    datasets: [
      {
        label: "Notifications Values",
        backgroundColor: "#c45850",
        borderColor: "#c45850",
        borderWidth: 1,
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
    maintainAspectRatio: false,
  };

  const chartStyle = {
    width,
    height,
  };

  return (
    <div className="chart-item">
      <Line data={chartData} options={chartOptions} style={chartStyle} />
    </div>
  );
};

export default ChartLineYear;
