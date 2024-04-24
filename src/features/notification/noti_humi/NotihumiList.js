import React from "react";
import { useGetNotihumiQuery } from "./notihumiApiSlice";
import Notihumi from "./Notihumi";
import "../../../styles/Table.css";

import { useState, useEffect } from "react";
import "../../../styles/pagination.css";

import ChartLineYear from "../../../components/ChartLineYear";
const NotihumiList = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState([]);


  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiHumi/chartByMonth"
      );
      const result = await response.json();
      setAllData(result);
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
    data: notihumi,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotihumiQuery();

  let content;


  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { entities } = notihumi;
    const monitorIds = Object.keys(entities);
    // console.log(monitorIds);
    const filteredIds = monitorIds.filter((monitorId) => {
      const monitor = entities[monitorId];
      
      const date = new Date(monitor.createdAt);
      const formattedDate = date.toLocaleString();
      if (!searchQuery) return true;

      return (
        String(monitor.temp).includes(searchQuery) ||
        String(monitor.humidity).includes(searchQuery) ||
        (searchQuery === "detect" && monitor.lighting === "detect") ||
        String(monitor.lighting).includes(searchQuery) ||
        String(formattedDate).includes(searchQuery)
      );
    });
    const totalPages = Math.ceil(filteredIds.length / itemsperpage);

    const indexOfLastItem = currentpage * itemsperpage;
    const indexOfFirstItem = indexOfLastItem - itemsperpage;

    const renderPageNumbers = Array.from({ length: totalPages }).map(
      (_, index) => {
        const number = index + 1;
        if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
          return (
            <li key={number}>
              <button
                id={number}
                onClick={() => setCurrentPage(number)}
                className={currentpage === number ? "active" : null}
              >
                {number}
              </button>
            </li>
          );
        } else {
          return null;
        }
      }
    );

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
    const tableContent = filteredIds.slice(indexOfFirstItem, indexOfLastItem)
          .map((notihumiId) => (
            <Notihumi
              key={notihumiId}
              notihumiId={notihumiId}
              searchQuery={searchQuery}
            />
          ));

    return (
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
              <ChartLineYear data={allData} width={1024} height={560} />
            </div>
            <div className="table-section">
              <table className="table-monitor">
                <thead className="table__thead">
                  <tr>
                    <th scope="col" className="table__th-temp">
                    Flame
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
                      disabled={currentpage === 1}
                    >
                      Prev
                    </button>
                  </li>
                  {renderPageNumbers}
                  <li className="btn-pg-li">
                    <button
                      onClick={handleNextbtn}
                      disabled={currentpage === totalPages}
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
  return null;
};

export default NotihumiList;