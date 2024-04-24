import React, { useState, useEffect } from "react";
import { useGetMonitorsQuery } from "./monitorApiSlice";
import Monitor from "./Monitor";
import "../../styles/Table.css";
import ChartLineYear from "../../components/ChartLineYear";
import ExportCSV from "../../app/importCsv";

const MonitorList = () => {
  const [dataimage, setDataImage] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChart, setSelectedChart] = useState("Temp");
  const [allData, setAllData] = useState([]);

  const {
    data: monitors,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMonitorsQuery();

  useEffect(() => {
    console.log("Selected Chart changed:", selectedChart);
    fetchData(selectedChart);
  }, [selectedChart]);

  const fetchData = async (chartType) => {
    try {
      const response = await fetch(`https://datacenter-api.onrender.com/moniters/chartByMonth${chartType}`);
      const result = await response.json();
      const responseAllData = await fetch(`https://datacenter-api.onrender.com/moniters/csv`);
      const resultAllData = await responseAllData.json();
      setDataImage(result);
      setAllData(resultAllData);
      console.log("result",result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleChartButtonClick = (chartType) => {
    console.log("chartType", chartType);
    setSelectedChart(chartType);
  };

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { entities } = monitors;
    const monitorIds = Object.keys(entities);

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

    const renderPageNumbers = Array.from({ length: totalPages }).map((_, index) => {
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

    const tableContent = filteredIds.slice(indexOfFirstItem, indexOfLastItem).map((monitorId) => (
      <Monitor key={monitorId} monitorId={monitorId} searchQuery={searchQuery} />
    ));


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
            {/* <button
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
              Flame Chart
            </button> */}
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
          <div className="ChartSection" >
            <ChartLineYear data={dataimage} width={720} height={480} title={"Log Monitor by Year"}/>
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
                  flame
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
        <div className="btn-export">
          <ExportCSV data={allData} fileName="exported_data.csv" />
        </div>
      </div>
    );
  }
  return null;
};

export default MonitorList;
