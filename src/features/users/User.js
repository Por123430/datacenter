import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";
import edit from "../../img/edit.png"

import "../../styles/Table.css"
const User = ({ userId }) => {
  const user = useSelector(state => selectUserById(state, userId));

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
      
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{user.username}</td>
        <td className={`table-cell ${cellStatus}`}>{user.firstname}</td>
        <td className={`table-cell ${cellStatus}`}>{user.lastname}</td>
        <td className={`table-cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table-cell ${cellStatus}`}>
          <button className="icon-edit" onClick={handleEdit}>
            <img src={edit} alt="editUser"></img>
          </button>
        </td>
      </tr>
    )
  } else return null;
}

export default User;
