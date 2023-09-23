import React from "react";
import "../../../styles/Table.css";
import { useGetNotilightQuery } from "./notilightApiSlice";
import Notilight from "./Notilight";

import { useState } from "react";
import "../../../styles/pagination.css";
const NotilightList = () => {
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

    // console.log(notihumi)
    const tableContent = ids?.length
      ? ids
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((notilightId) => (
            <Notilight key={notilightId} notilightId={notilightId} searchQuery={searchQuery}/>
          ))
      : null;

    content = (
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
                flame
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
              disabled={currentpage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </div>
      </div>
    );
  }
  return content;
};

export default NotilightList;
