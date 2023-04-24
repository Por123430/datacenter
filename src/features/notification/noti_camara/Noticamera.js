import React from "react";

import "../../../styles/Table.css";

import "firebase/storage";
const Noticamera = ({ url }) => {
  // const url1 = url.url;

  const x = url.metadata;
  const date = new Date(x.timeCreated);
  const formattedDate = date.toLocaleString();

  if (url) {
    // console.log("url",url.downloadURL)
    // console.log("timeCreated",x.name)

    const cellStatus = url.active ? "" : "table__cell--inactive";

    return (
      <>
        <tr className="table-allcell">
          <td className={`table-cell ${cellStatus}`}>
            <img src={url.downloadURL} alt="img"></img>
          </td>
          <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
        </tr>
      </>
    );
  } else return null;
};

export default Noticamera;
