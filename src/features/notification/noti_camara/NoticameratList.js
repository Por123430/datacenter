// import React from "react";
// import "../../../styles/Table.css";
// import Noticamera from "./Noticamera";
// import { useState, useEffect } from "react";

// import ChartLineYear from "../../../components/ChartLineYear";

// import {
//   ref,
//   list,
//   listAll,
//   getDownloadURL,
//   getMetadata,
//   getBlob,
// } from "firebase/storage";
// import { storage } from "../../../firebase";
// import "firebase/storage";
// const NoticameraList = () => {
//   const [currentpage, setCurrentPage] = useState(1);
//   const [itemsperpage, setItemPerPage] = useState(3);

//   const pages = [];

//   const [pageNumberLimit, setPageNumberLimit] = useState(5);
//   const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
//   const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [dataYear, setDataYear] = useState([]);

//   const fetchDataYear = async () => {
//     try {
//       const response = await fetch(
//         "https://datacenter-api.onrender.com/notiCamera/chartByMonth"
//       );
//       const result = await response.json();
//       setDataYear(result);
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   const handleSearchInputChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     setCurrentPage(1); // Reset current page when search query changes
//   };
//   const handleClick = (event) => {
//     setCurrentPage(Number(event.target.id));
//   };

//   const [x, setX] = useState([{ url: null, time: null }]);

//   const [imageUrls, setImageUrls] = useState([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const storageRef = ref(storage, "motion-sensor/");
//       const result = await listAll(storageRef);
//       const metadataPromises = result.items.map((imageRef) => {
//         return Promise.all([getMetadata(imageRef), getDownloadURL(imageRef)]);
//       });

//       const metadataList = await Promise.all(metadataPromises);

//       const files = metadataList.map(([metadata, downloadURL]) => {
//         return { metadata, downloadURL };
//       });
//       files.sort((a, b) => {
//         // Compare timeCreated
//         if (a.metadata.timeCreated < b.metadata.timeCreated) {
//           return 1;
//         } else if (a.metadata.timeCreated > b.metadata.timeCreated) {
//           return -1;
//         }

//         // If timeCreated is the same, compare downloadURL
//         if (a.downloadURL < b.downloadURL) {
//           return -1;
//         } else if (a.downloadURL > b.downloadURL) {
//           return 1;
//         }

//         return 0;
//       });

//       // console.log("file", files);
//       setImageUrls(files);
//     };

//     fetchImages();
//     fetchDataYear();
//   }, []);

//   for (let i = 1; i <= Math.ceil(imageUrls.length / itemsperpage); i++) {
//     pages.push(i);
//   }

//   const indexOfLastItem = currentpage * itemsperpage;
//   const indexOfFirstItem = indexOfLastItem - itemsperpage;
//   imageUrls.slice(indexOfFirstItem, indexOfLastItem);
//   const renderPageNumbers = pages.map((number) => {
//     if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
//       return (
//         <li

//         >
//           <button key={number}
//             id={number}
//             onClick={handleClick}
//             className={currentpage === number ? "active" : null}>
//             {number}
//           </button>
//         </li>
//       );
//     } else {
//       return null;
//     }
//   });
//   const handleNextbtn = () => {
//     setCurrentPage(currentpage + 1);
//     if (currentpage + 1 > maxpageNumberLimit) {
//       setMaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit);
//       setMinPageNumberLimit(minpageNumberLimit + pageNumberLimit);
//     }
//   };
//   const handlePrevbtn = () => {
//     setCurrentPage(currentpage - 1);
//     if ((currentpage - 1) % pageNumberLimit === 0) {
//       setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
//       setMinPageNumberLimit(minpageNumberLimit - pageNumberLimit);
//     }
//   };

//   // console.log(notihumi)
//   const tableContent = imageUrls?.length
//     ? imageUrls
//         .slice(indexOfFirstItem, indexOfLastItem)
//         .map((imageUrls) => (
//           <Noticamera url={imageUrls} searchQuery={searchQuery} />
//         ))
//     : null;

//   const content = (
//     <div>
       
//       <div className="search">
//       <div className="filter" >
//             <button
//                style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}
              
//             >
//               Temperature Chart
//             </button>
//             <button
//               style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}

//             >
//               Humidity Chart
//             </button>
//             <button
//               style={{ color: '#F0F1F3', backgroundColor: '#F0F1F3', cursor: 'default' }}

//             >
//               Light Chart
//             </button>
//           </div>
//         <form onSubmit={(e) => e.preventDefault()} role="search">
//           <label htmlFor="search">Search for stuff</label>
//           <input
//             id="search"
//             type="search"
//             placeholder="Search..."
//             autoFocus
//             required
//             value={searchQuery}
//             onChange={handleSearchInputChange}
//           />
//         </form>
//       </div>
//       <div className="data-section">
//         <div className="ChartSection">
//           {/* <ChartLineYear data={dataYear} monitor={1} /> */}
//           <ChartLineYear data={dataYear} width={1024} height={560}/>
//         </div>
//         <div className="table-section">
//           <table className="table-monitor">
//             <thead className="table__thead">
//               <tr>
//                 <th scope="col" className="table__th-temp">
//                   image
//                 </th>
//                 <th scope="col" className="table__th-moistures">
//                   date-time
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* {console.log(x)} */}
//               {tableContent}
//             </tbody>
//           </table>
//           <div className="pagination-page">
//               <div className="content-pg">
//                 <li className="btn-pg-li">
//                   <button
//                     onClick={handlePrevbtn}
//                     disabled={currentpage === pages[0] ? true : false}

//                   >
//                     Prev
//                   </button>
//                 </li>
//                 {renderPageNumbers}
//                 <li className="btn-pg-li">
//                   <button
//                     onClick={handleNextbtn}
//                     disabled={currentpage === pages[pages.length - 1] ? true : false}

//                   >
//                     Next
//                   </button>
//                 </li>
//               </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
//   // }
//   return content;
// };

// export default NoticameraList;
import React, { useState, useEffect } from "react";
import "../../../styles/Table.css";
import Noticamera from "./Noticamera";
import { ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import ChartLineYear from "../../../components/ChartLineYear";

const NoticameraList = () => {
  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage] = useState(3);
  const [pageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [dataYear, setDataYear] = useState([]);

  const fetchDataYear = async () => {
    try {
      const response = await fetch(
        "https://datacenter-api.onrender.com/notiCamera/chartByMonth"
      );
      const result = await response.json();
      setDataYear(result);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, "motion-sensor/");
      const result = await listAll(storageRef);
      const metadataPromises = result.items.map((imageRef) => {
        return Promise.all([getMetadata(imageRef), getDownloadURL(imageRef)]);
      });

      const metadataList = await Promise.all(metadataPromises);

      const files = metadataList.map(([metadata, downloadURL]) => {
        return { metadata, downloadURL };
      });
      files.sort((a, b) => {
        if (a.metadata.timeCreated < b.metadata.timeCreated) {
          return 1;
        } else if (a.metadata.timeCreated > b.metadata.timeCreated) {
          return -1;
        }

        if (a.downloadURL < b.downloadURL) {
          return -1;
        } else if (a.downloadURL > b.downloadURL) {
          return 1;
        }

        return 0;
      });

      setImageUrls(files);
    };

    fetchImages();
    fetchDataYear();
  }, []);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const filteredImageUrls = imageUrls.filter((imageUrl) => {
    
    const { timeCreated } = imageUrl.metadata;
    
  
    const formattedDate = new Date(timeCreated).toLocaleString();
    
    console.log("formattedDate: " , formattedDate);
    
   
    return String(formattedDate).includes(searchQuery);
  });
  

  const totalPages = Math.ceil(filteredImageUrls.length / itemsperpage);

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
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentpage - 1);
    if ((currentpage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit);
    }
  };

  const tableContent = filteredImageUrls
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((imageUrl, index) => (
      <Noticamera key={index} url={imageUrl} searchQuery={searchQuery} />
    ));

  return (
    <div>
      <div className="search">
        <div className="filter">
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
          <ChartLineYear data={dataYear} width={1024} height={560} />
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
};

export default NoticameraList;
