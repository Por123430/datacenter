import React from "react";
import "../../../styles/Table.css";
import { useGetNotilightQuery } from "./notilightApiSlice";
import Notilight from "./Notilight";

import { useEffect, useState } from "react";
import "../../../styles/pagination.css";
import ChartLineYear from "../../../components/ChartLineYear";

const NotilightList = () => {
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
        "https://datacenter-api.onrender.com/notiLight/chartByMonth"
      );
      const result = await response.json();
      setDataYear(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  useEffect(() => {
    fetchDataYear();
  }, []);
  const {
    data: notilight,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotilightQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = notilight;
    for (let i = 1; i <= Math.ceil(ids.length / itemsperpage); i++) {
      pages.push(i);
    }

    const indexOfLastItem = currentpage * itemsperpage;
    const indexOfFirstItem = indexOfLastItem - itemsperpage;
    ids.slice(indexOfFirstItem, indexOfLastItem);
    const renderPageNumbers = pages.map((number) => {
      if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
        return (
          <li

          >
            <button key={number}
              id={number}
              onClick={handleClick}
              className={currentpage === number ? "active" : null}>
              {number}
            </button>
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

    // console.log(notihumi)
    const tableContent = ids?.length
      ? ids
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((notilightId) => (
            <Notilight
              key={notilightId}
              notilightId={notilightId}
              searchQuery={searchQuery}
            />
          ))
      : null;

    content = (
      <div>
        <div className="search">
        <div className="filter" >
            <button
               style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}
              
            >
              Temperature Chart
            </button>
            <button
              style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}

            >
              Humidity Chart
            </button>
            <button
              style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}

            >
              Light Chart
            </button>
          </div>
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
          <div className="ChartSection">
            <ChartLineYear data={dataYear} monitor={1} />
          </div>
          <div className="table-section">
            <table className="table-monitor">
              <thead className="table__thead">
                <tr>
                  <th scope="col" className="table__th-temp">
                    smoke
                  </th>
                  <th scope="col" className="table__th-moistures">
                    date-time
                  </th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </table>
            <div className="pagination-page">
              <div className="content-pg">
                <li className="btn-pg-li">
                  <button
                    onClick={handlePrevbtn}
                    disabled={currentpage === pages[0] ? true : false}

                  >
                    Prev
                  </button>
                </li>
                {renderPageNumbers}
                <li className="btn-pg-li">
                  <button
                    onClick={handleNextbtn}
                    disabled={currentpage === pages[pages.length - 1] ? true : false}

                  >
                    Next
                  </button>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default NotilightList;
