import React, {useState } from "react";
import "../../../styles/Table.css";
import Notitemp from "./Notitemp";
import { useGetNotitempQuery } from "./notitempApiSlice";
import "../../../styles/pagination.css";
const NotitempList = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

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

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }
  // console.log("notitemp",notitemp.length)
  // useEffect(()=>{
  //   const  ids  = notitemp;
  //
  //   setK(ids.ids)

  // },[setK,notitemp,k])
  if (isSuccess) {
    const { ids } = notitemp;

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

    // let pageIncrementBtn = null;
    // if(pages.length > maxpageNumberLimit){
    //   pageIncrementBtn= <li onClick={handleNextbtn}> &hellip; </li>
    // }

    // let pageDecrementBtn = null;
    // if(pages.length > maxpageNumberLimit){
    //   pageDecrementBtn= <li onClick={handlePrevbtn}> &hellip; </li>
    // }
    // console.log("notitempsdfs",ids.length)
    // const lenght = ids.length;
    // const page = lenght-5;
    // console.log("page",page)
    const tableContent = ids?.length
      ? ids
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((currentItems) => (
            <Notitemp key={currentItems} notitempId={currentItems} />
          ))
      : // : ids?.length || ids.lenght < 40
        // ? ids.slice(11,20).map((notitempId) => (
        //   <Notitemp key={notitempId} notitempId={notitempId} />
        // ))
        null;

    content = (
      <div>
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
          {/* <tbody>{kk}</tbody> */}
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
export default NotitempList;
