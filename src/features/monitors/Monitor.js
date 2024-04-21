import React from "react";
import { useSelector } from "react-redux";
import { selectMonitorById } from "./monitorApiSlice";

import "../../styles/Table.css";

const Monitor = ({ monitorId, searchQuery }) => {
  const monitor = useSelector((state) => selectMonitorById(state, monitorId));
  if (monitor) {
    const date = new Date(monitor.createdAt);
    const formattedDate = date.toLocaleString();
    const cellStatus = monitor.active ? "" : "table__cell--inactive";

    // Define a class variable to hold the CSS class based on monitor.lighting
    const lightingClass = monitor.lighting === 'detected' ? 'red-text' : '';

    if (
      !searchQuery ||
     String( monitor.temp).includes(searchQuery) ||
     String(monitor.humidity).includes(searchQuery) ||
     String(monitor.moisture).includes(searchQuery) ||
     String(monitor.lighting).includes(searchQuery) ||
      formattedDate.includes(searchQuery)
    ) {
      return (
        <tr className="table-allcell">
          <td className={`table-cell ${cellStatus} ${lightingClass}`}>{monitor.temp}</td>
          <td className={`table-cell ${cellStatus} ${lightingClass}`}>{monitor.moisture}</td>
          <td className={`table-cell ${cellStatus} ${lightingClass}`}>{monitor.lighting}</td>
          <td className={`table-cell ${cellStatus} ${lightingClass}`}>{formattedDate}</td>
        </tr>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default Monitor;
