import React from "react";
import { useSelector } from "react-redux";
import "../../../styles/Table.css";
import { selectNotiTemperatureById } from "./notitempApiSlice";

const Notitemp = ({ notitempId, searchQuery }) => {
  const notitemp = useSelector((state) =>
    selectNotiTemperatureById(state, notitempId)
  );

  if (notitemp) {
    const date = new Date(notitemp.createdAt);
    const formattedDate = date.toLocaleString();
    const cellStatus = notitemp.active ? "" : "table__cell--inactive";

    // Check if the search query is empty or the data matches the search query

    if (
      !searchQuery ||
      notitemp.temperature.includes(searchQuery) ||
      formattedDate.includes(searchQuery)
    ) {
      return (
        <tr className="table-allcell">
          <td className={`table-cell ${cellStatus}`}>{notitemp.temperature}</td>
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

export default Notitemp;
