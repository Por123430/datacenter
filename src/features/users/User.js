import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "./userApiSlice";
import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import "../../styles/Table.css";

const User = ({ userId, searchQuery, selectRole, onDeleteClick }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  
  const navigate = useNavigate();
 if (!user) {
    return null; // Return early if user is undefined
  }
  const handleEdit = () => navigate(`/dash/users/${userId}`);
  const cellStatus = user.active ? "" : "table__cell--inactive";
  
  if (
    (!searchQuery ||
      String(user.username).includes(searchQuery) ||
      String(user.firstname).includes(searchQuery) ||
      String(user.moisture).includes(searchQuery) ||
      String(user.lastname).includes(searchQuery)) &&
    (!selectRole || user.roles.includes(selectRole))
  ) {
    return (
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{user.username}</td>
        <td className={`table-cell ${cellStatus}`}>{user.firstname}</td>
        <td className={`table-cell ${cellStatus}`}>{user.lastname}</td>
        <td className={`table-cell ${cellStatus}`}>{user.line ?? "-"}</td>
        <td className={`table-cell ${cellStatus}`}>{user.roles}</td>
        <td className={`table-cell ${cellStatus}`}>
          <button
            className="icon-edit"
            onClick={handleEdit}
            style={{ padding: "0px", margin: "0px", width: "20px" }}
          >
            <img src={edit} alt="editUser" />
          </button>
        </td>
        <td className={`table-cell ${cellStatus}`}>
          <button
            className="icon-delete"
            onClick={() => onDeleteClick(user.id)} // Call onDeleteClick with user id
            style={{ padding: "0px", margin: "0px", width: "10px" }}
          >
            <img src={del} alt="deleteUser" style={{ width: "30px" }} />{" "}
            {/* Use the delete icon */}
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default User;

