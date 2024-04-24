import React, { useState } from "react";
import { useGetUsersQuery } from "./userApiSlice";
import User from "./User";
import "../../styles/Table.css";
import { useDeleteUserMutation } from "./userApiSlice";
import useAuth from "../../hooks/useAuth";

import { Link, useNavigate } from "react-router-dom";

import "../../styles/pagination.css";
import close from "../../img/close.png";
import line from "../../img/line.jpg";
import alert from "../../img/alert.png";

const UserList = () => {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { isAdmin, isOfficer } = useAuth();
  const [dataimage, setDataImage] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);

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

  const handlePopupClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  const closePopupClick = () => {
    setPopupOpen(false);
    setPopupData(null);
  };

  const {
    data: users,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();

  const onDeleteUserClicked = async (userId) => {
    try {
      await deleteUser({ id: userId });

      refetch(); // Refetch the data after successful deletion
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const navigate = useNavigate();
  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    onDeleteUserClicked(deleteUserId);
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
    setShowConfirmation(false);
  };

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
          .map((userId) => (
            <User
              key={userId}
              userId={userId}
              searchQuery={searchQuery}
              selectRole={selectRole}
              onDeleteClick={handleDeleteClick}
            />
          ))
      : null;

    content = (
      <div>
        <div
          className="all-title-content"
          style={{
            background: "#F4F4EF",
            fontSize: "1.4rem",
            padding: "20px 70px",
            color: "black",
            boxShadow:
              "rgba(45, 46, 46, 0.35) 0px 4px 32px 0px, rgba(45, 46, 46, 0.08) 0px 4px 16px 0px, rgba(45, 46, 46, 0.1) 0px 0px 4px 0px",
          }}
        >
           User
        </div>
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
          <div className="add-line">
            <div className="add-line-btn">
              <div className="add-user-button" onClick={handlePopupClick}>
                Add Line
              </div>
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
                Line
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
              <button onClick={handlePrevbtn} disabled={currentpage === 1}>
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
        {showConfirmation && (
          <div className="overlay">
            <div
              className="popupData"
              style={{ height: "260px", width: "500px" }}
            >
              <div className="content">
                <img
                  src={alert}
                  alt="alert"
                  style={{
                    width: "72px",
                    margin: "20px 44%",
                  }}
                />
                <div
                  className="title-popup"
                  style={{ margin: "0px 0px 35px 0px" }}
                >
                  Are you sure you want to delete this user?
                </div>

                <div className="pagination-page">
                  <div className="content-pg">
                    <button
                      onClick={confirmDelete}
                      style={{ backgroundColor: "#00AA9F" }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={cancelDelete}
                      style={{ backgroundColor: " #ea5455" }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isPopupOpen && (
          <div className="overlay">
            <div className="popupData" style={{width: "575px"}}>
              <div className="content-close-icon">
                <button className="close" onClick={closePopupClick}>
                  <img src={close} alt="close-icon" className="close-icon" />
                </button>
              </div>

              <div className="title-popup">
                Scan Qr Code to receive Notifications via Line
              </div>
              <div className="content">
                <img src={line} alt="line" className="line-img" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return content;
};

export default UserList;
