import React from "react";
import { Bar } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "../../../frontend/src/styles/chart.css";
const ChartsMonth = ({ data }) => {
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
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: temp.map((item) => item.Count),
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notifications By Month",
      },
    },
  };

  return (
    <div className="chart-item">
      {" "}
      {/* Set desired width and height */}
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartsMonth;
