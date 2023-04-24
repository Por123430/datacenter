import React from 'react'
import { useGetMonitorsQuery } from './monitorApiSlice'
import Monitor from './Monitor'
import "../../styles/Table.css"

import { useState } from "react";
import "../../styles/pagination.css";
const MonitorList = () => {
  const [dataimage, setDataImage] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(15);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
    const {
        data: monitors,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetMonitorsQuery()
    
      let content
    
      if (isLoading) content = <p>Loading...</p>
    
      if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
      }
    
      if (isSuccess) {
        const { ids } = monitors
        for (let i = 1; i <= Math.ceil(ids.length / itemsperpage); i++) {
          pages.push(i);
        }
    
        const indexOfLastItem = currentpage * itemsperpage;
        const indexOfFirstItem = indexOfLastItem - itemsperpage;
        ids.slice(indexOfFirstItem, indexOfLastItem);
        const renderPageNumbers = pages.map((number) => {
          if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
            return (
              <li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentpage === number ? "active" : null}
              >
                {number}
              </li>
            );
          } else {
            return null;
          }
        });
        const handleNextbtn = () => {
          setCurrentPage(currentpage + 1);
          if (currentpage + 1 > maxpageNumberLimit) {
            setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit);
          }
        };
        const handlePrevbtn = () => {
          setCurrentPage(currentpage - 1);
          if ((currentpage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit);
          }
        };
        const tableContent = ids?.length
            ? ids.slice(indexOfFirstItem, indexOfLastItem).map(monitersId => <Monitor key={monitersId} monitorId={monitersId} />)
            : null
        
       content = (
        <div>
          <table className="table-monitor">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th-temp">temperature</th>
                <th scope="col" className="table__th-moistures">humidity</th>
                <th scope="col" className="table__th-lighting">flame</th>
                <th scope="col" className="table__th-createdAt">date-time</th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
          <div className="pagination-page">
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentpage === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>

          {renderPageNumbers}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentpage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </div>
        </div>
        )
      }
      return content
}

export default MonitorList