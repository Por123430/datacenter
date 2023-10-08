import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSensorById } from './sensorApiSlice';
import "../../styles/Table.css"
import edit from "../../img/edit.png"
const Sensor = ({ sensorId }) => {
    const sensor = useSelector(state => selectSensorById(state, sensorId));
    // console.log("ldskfls",sensor.temp)
  const navigate = useNavigate();
  if (sensor) {
    const handleEdit = () => navigate(`/dash/sensor/${sensorId}`);

    const cellStatus = sensor.active ? '' : 'table__cell--inactive'

    return (
      
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{sensor.model}</td>
        <td className={`table-cell ${cellStatus}`}>{sensor.temp}</td>
        <td className={`table-cell ${cellStatus}`}>{sensor.moisture}</td>
        <td className={`table-cell ${cellStatus}`}>{sensor.position}</td>
        <td className={`table-cell ${cellStatus}`}>
          <button className="icon-edit" onClick={handleEdit}>
            <img src={edit} alt="editUser"></img>
          </button>
        </td>
      </tr>
    )
  } else return null;
}

export default Sensor