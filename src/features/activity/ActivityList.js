import React from "react";
import { useGetActivityQuery } from "./activityApiSlice";
import Activity from "./Activity";
import "../../styles/Table.css";

import { useTable, usePagination } from "react-table";
// import { useState,useEffect } from "react";
// import useTable from "../../hooks/useTable";
// import TableFooter from "../../components/TableFooter";
// import { useTable, usePagination } from "react-table";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectAllActivity } from "./activityApiSlice"; 
const ActivityList = () => {
  const {
    data: activity,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetActivityQuery();
  
  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = activity;
    const tableContent = ids?.length
      ? ids.map((activityId) => (
          <Activity key={activityId} activityId={activityId} />
        ))
      : null;

      
  


   
    content = (
      <div>
        <table className="table-monitor">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th-temp">
                User
              </th>
              <th scope="col" className="table__th-moistures">
                Time-Login
              </th>
              <th scope="col" className="table__th-lighting">
                Time-Logout
              </th>
              <th scope="col" className="table__th-lighting">
                id
              </th>
            </tr>
          </thead>
          <tbody size={10}>{tableContent}</tbody>
        </table>
        <div className="table-button">
          <button>PreviousPage</button>
          <button>NextPage</button>
        </div>
      </div>
    );
  }

  return content;
  /*-------------------------------------------------------------*/




};

export default ActivityList;
