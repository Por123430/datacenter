import React from "react";
import { useGetMonitorsQuery } from "./monitorApiSlice";
import Monitor from "./Monitor";
import "../../styles/Table.css";

import { useState } from "react";
import "../../styles/pagination.css";
const MonitorList = () => {
  const [dataimage, setDataImage] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const {
    data: monitors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMonitorsQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = monitors;
    const totalPages = Math.ceil(ids.length / itemsperpage);

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    const indexOfLastItem = currentpage * itemsperpage;
    const indexOfFirstItem = indexOfLastItem - itemsperpage;

    const renderPageNumbers = pages.map((number) => {
      if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
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
      ? ids
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((monitersId) => (
            <Monitor
              key={monitersId}
              monitorId={monitersId}
              searchQuery={searchQuery}
            />
          ))
      : null;

      return  (
      <div>
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()} role="search">
            <label htmlFor="search">Search for stuff</label>
            <input
              id="search"
              type="search"
              placeholder="Search..."
              autoFocus
              required
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </form>
        </div>
        <table className="table-monitor">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th-temp">
                temperature
              </th>
              <th scope="col" className="table__th-moistures">
                humidity
              </th>
              <th scope="col" className="table__th-lighting">
              smoke
              </th>
              <th scope="col" className="table__th-createdAt">
                date-time
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
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
    );
  }
  return null;
};

export default MonitorList;
