import React, { useState } from "react";
import "../../../styles/Table.css";
import Notitemp from "./Notitemp";
import {
  useGetNotitempQuery,
  useSearchNotitempMutation,
} from "./notitempApiSlice";
import "../../../styles/pagination.css";


import ChartLineYear from "../../../components/ChartLineYear";


const NotitempList = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [dataYear, setDataYear] = useState([]);


  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiTemp/chartByMonth"
      );
      const result = await response.json();
      setDataYear(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const {
    data: notitemp,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotitempQuery();

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = notitemp;

    // Calculate total number of pages
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
          .map((notitempId) => (
            <Notitemp
              key={notitempId}
              notitempId={notitempId}
              searchQuery={searchQuery}
            />
          ))
      : null;

    return (
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
        <div className="data-section">
          <div className="ChartSection" >
            <ChartLineYear data={dataYear} monitor={1}/>
          </div>
          <div className="table-section">
            <table className="table-monitor">
              <thead className="table__thead">
                <tr>
                  <th scope="col" className="table__th-temp">
                    temperature
                  </th>
                  <th scope="col" className="table__th-moistures">
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
                  disabled={
                    currentpage === pages[pages.length - 1] ? true : false
                  }
                >
                  Next
                </button>
              </li>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NotitempList;
