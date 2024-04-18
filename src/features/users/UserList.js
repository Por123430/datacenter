
import React, { useState } from "react";
import { useGetUsersQuery } from "./userApiSlice";
import User from "./User";
import "../../styles/Table.css";

import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";

import "../../styles/pagination.css";

const UserList = () => {
  const { isAdmin, isOfficer } = useAuth();
  const [dataimage, setDataImage] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const [itemsperpage, setItemPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectRole, setSelectRole] = useState("");

  const pages = [];
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minpageNumberLimit, setMinPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const [activeLink, setActiveLink] = useState(null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handleSelectRoleChange = (event) => {
    const role = event.target.value;
    setSelectRole(role);
    setCurrentPage(1);
  };

  console.log("searchQuery",searchQuery);
  console.log("selectRole",selectRole);
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = (
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
    );
  }

  if (isSuccess) {
    const { ids } = users;
    for (let i = 1; i <= Math.ceil(ids.length / itemsperpage); i++) {
      pages.push(i);
    }

    const indexOfLastItem = currentpage * itemsperpage;
    const indexOfFirstItem = indexOfLastItem - itemsperpage;
    ids.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
      if (number <= maxpageNumberLimit && number >= minpageNumberLimit + 1) {
        return (
          <li key={number}>
            <button
              id={number}
              onClick={handleClick}
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

    const tableContent = ids?.length
      ? ids
          .slice(indexOfFirstItem, indexOfLastItem)
          .map((userId) => <User key={userId} userId={userId} searchQuery={searchQuery} selectRole ={selectRole}/>)
      : null;

    content = (
      <div>
        <div className="all-title-content" style={{ background: "gray", fontSize: "1.4rem", padding: "20px 70px", color: "white" }}>Statistic</div>
        <div className="header-user">
          <div className="search-user">
            <input
              id="search"
              type="search"
              placeholder="Search..."
              autoFocus
              required
              className="search-user"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
          {/* <div className="select-user">
            <div className="custom-select">
              <button
                className="select-button"
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-controls="select-dropdown"
              >
                <span className="selected-value">Role</span>
                <span className="arrow"></span>
              </button>
              <ul className="select-dropdown" role="listbox" id="select-dropdown">
                <li role="option">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="Admin"
                    checked={selectRole === "Admin"}
                    onChange={handleSetSelectRole}
                  />
                  <label htmlFor="admin">
                    <i className="bx bxl-admin"></i>Admin
                  </label>
                </li>
                <li role="option">
                  <input
                    type="radio"
                    id="officer"
                    name="role"
                    value="Officer"
                    checked={selectRole === "Officer"}
                    onChange={handleSetSelectRole}
                  />
                  <label htmlFor="officer">
                    <i className="bx bxl-officer"></i>Officer
                  </label>
                </li>
              </ul>
            </div>
          </div> */}

          <div className="select-user">
            <div className="custom-select">
              <select
                className="select-button"
                value={selectRole}
                onChange={handleSelectRoleChange}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Officer">Officer</option>
              </select>
            </div>
          </div>
          <div className="add-user">
            {isAdmin && (
              <Link to="/dash/users/new" className="dash-nav__link">
                <div
                  className="add-user-button"
                  onClick={() => handleLinkClick("addUser")}
                >
                  Add User
                </div>
              </Link>
            )}
          </div>
        </div>

        <table className="table-user">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__thuser__username">
                Username
              </th>
              <th scope="col" className="table__thuser__username">
                Firstname
              </th>
              <th scope="col" className="table__thuser__roles">
                Lastname
              </th>
              <th scope="col" className="table__thuser__roles">
                Roles
              </th>
              <th scope="col" className="table__thuser__edit">
                Edit
              </th>
              <th scope="col" className="table__thuser__edit">
                Delete
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
                disabled={currentpage === pages.length}
              >
                Next
              </button>
            </li>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default UserList;
