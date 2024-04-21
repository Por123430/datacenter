import React from "react";
import "../../../styles/Table.css";
import Noticamera from "./Noticamera";
import { useState, useEffect } from "react";

import ChartLineYear from "../../../components/ChartLineYear";

import {
  ref,
  list,
  listAll,
  getDownloadURL,
  getMetadata,
  getBlob,
} from "firebase/storage";
import { storage } from "../../../firebase";
import "firebase/storage";
const NoticameraList = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(3);

  const pages = [];

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [dataYear, setDataYear] = useState([]);

  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/notiCamera/chartByMonth"
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

  const [x, setX] = useState([{ url: null, time: null }]);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "motion-sensor1/");
      const result = await listAll(storageRef);
      const metadataPromises = result.items.map((imageRef) => {
        return Promise.all([getMetadata(imageRef), getDownloadURL(imageRef)]);
      });

      const metadataList = await Promise.all(metadataPromises);

      const files = metadataList.map(([metadata, downloadURL]) => {
        return { metadata, downloadURL };
      });
      files.sort((a, b) => {
        // Compare timeCreated
        if (a.metadata.timeCreated < b.metadata.timeCreated) {
          return 1;
        } else if (a.metadata.timeCreated > b.metadata.timeCreated) {
          return -1;
        }

        // If timeCreated is the same, compare downloadURL
        if (a.downloadURL < b.downloadURL) {
          return -1;
        } else if (a.downloadURL > b.downloadURL) {
          return 1;
        }

        return 0;
      });

      // console.log("file", files);
      setImageUrls(files);
    };

    fetchImages();
    fetchDataYear();
  }, []);

  for (let i = 1; i <= Math.ceil(imageUrls.length / itemsperpage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentpage * itemsperpage;
  const indexOfFirstItem = indexOfLastItem - itemsperpage;
  imageUrls.slice(indexOfFirstItem, indexOfLastItem);
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
  const tableContent = imageUrls?.length
    ? imageUrls
        .slice(indexOfFirstItem, indexOfLastItem)
        .map((imageUrls) => (
          <Noticamera url={imageUrls} searchQuery={searchQuery} />
        ))
    : null;

  const content = (
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
          {/* <ChartLineYear data={dataYear} monitor={1} /> */}
          <ChartLineYear data={dataYear} width={1024} height={560}/>
        </div>
        <div className="table-section">
          <table className="table-monitor">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th-temp">
                  image
                </th>
                <th scope="col" className="table__th-moistures">
                  date-time
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(x)} */}
              {tableContent}
            </tbody>
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
  // }
  return content;
};

export default NoticameraList;
