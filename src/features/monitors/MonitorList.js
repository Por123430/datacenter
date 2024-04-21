import React from "react";
import { useGetMonitorsQuery } from "./monitorApiSlice";
import Monitor from "./Monitor";
import "../../styles/Table.css";

import { useState, useEffect } from "react";
import "../../styles/pagination.css";


import ChartLineYear from "../../components/ChartLineYear";
import ExportCSV from "../../app/importCsv";

const MonitorList = () => {
  const [dataimage, setDataImage] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedChart, setSelectedChart] = useState("Temp")
  const [allData, setAllData ] = useState([]);

  useEffect(() => {
    fetchData(selectedChart); // Fetch data for the selected chart
  }, [selectedChart]);


  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when search query changes
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const fetchData = async (chartType) => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/moniters/chartByMonth${chartType}`);
      const result = await response.json();
      const responseAllData= await fetch(`https://datacenter-api.onrender.com/moniters/csv`);
      const resultAllData = await responseAllData.json();
      setDataImage(result);
      setAllData(resultAllData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleChartButtonClick = (chartType) => {
    setSelectedChart(chartType); // Set the selected chart
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

    return (
      <div>
        <div className="all-title-content" style={{
    background: "#F4F4EF",
    fontSize: "1.4rem",
    padding: "20px 70px",
    color: "black",
    boxShadow: "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px"
  }}>Log Monitor</div>
        <div className="search">
          <div className="filter">
            <button
              onClick={() => handleChartButtonClick("Temp")}
              className={selectedChart === "Temp" ? "active" : ""}
            >
              Temperature Chart
            </button>
            <button
              onClick={() => handleChartButtonClick("Humi")}
              className={selectedChart === "Humi" ? "active" : ""}
            >
              Humidity Chart
            </button>
            <button
              onClick={() => handleChartButtonClick("Light")}
              className={selectedChart === "Light" ? "active" : ""}
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
          <div className="ChartSection" >
            <ChartLineYear data={dataimage}   width={720} height={480}/>
          </div>
          <div className="table-section">
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
        <div className="btn-export">
      
      <ExportCSV data={allData} fileName="exported_data.csv" />
    </div>
      </div>
      
    );
  }
  return null;
};

export default MonitorList;
