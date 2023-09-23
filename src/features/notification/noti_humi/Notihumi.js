import React from "react";
import { useSelector } from "react-redux";
import { selectNotiHumiditiesById } from "./notihumiApiSlice";
import "../../../styles/Table.css";
const Notihumi = ({ notihumiId, searchQuery }) => {
  console.log(notihumiId);
  const notihumi = useSelector((state) =>
    selectNotiHumiditiesById(state, notihumiId)
  );
  if (notihumi) {
    const date = new Date(notihumi.createdAt);
    const formattedDate = date.toLocaleString();
    const cellStatus = notihumi.active ? "" : "table__cell--inactive";

    if (
      !searchQuery ||
      notihumi.humidity.includes(searchQuery) ||
      formattedDate.includes(searchQuery)
    ) {
      return (
        <tr className="table-allcell">
          <td className={`table-cell ${cellStatus}`}>{notihumi.humidity}</td>
          <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
        </tr>
      );
    } else {
      return null;
    }
  } else return null;
};

export default Notihumi;
