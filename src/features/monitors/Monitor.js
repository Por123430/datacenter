import React from "react";
import { useSelector } from "react-redux";
import { selectMonitorById } from "./monitorApiSlice";

import "../../styles/Table.css";

const Monitor = ({ monitorId, searchQuery }) => {
  const monitor = useSelector((state) => selectMonitorById(state, monitorId));
  console.log(monitorId);
  if (monitor) {
    const date = new Date(monitor.createdAt);
    const formattedDate = date.toLocaleString();
    const cellStatus = monitor.active ? "" : "table__cell--inactive";

    // const humidity = String(monitor.humidity).toLowerCase();
    // const moisture = String(monitor.moisture).toLowerCase();
    // const lighting = String(monitor.lighting).toLowerCase();
    // const query = searchQuery.toLowerCase();
    console.log(searchQuery);
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
          <td className={`table-cell ${cellStatus}`}>{monitor.temp}</td>
          <td className={`table-cell ${cellStatus}`}>{monitor.moisture}</td>
          <td className={`table-cell ${cellStatus}`}>{monitor.lighting}</td>
          <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
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
