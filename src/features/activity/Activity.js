import React from 'react'
import { useSelector } from 'react-redux'
import { selectActivityById } from './activityApiSlice'
import "../../styles/Table.css"
import { useTable, usePagination } from "react-table"

const Activity = ({ activityId }) => {
    const activity = useSelector(state => selectActivityById(state, activityId));
    
    // const navigate = useNavigate();
    if (activity) {
      // const handleEdit = () => navigate(`/dash/monitors/${monitorId}`);
  
      // const monitorRolesString = monitor.roles.toString().replaceAll(',', ', ');
  
      const cellStatus = activity.active ? '' : 'table__cell--inactive'
  
      return (
        
        <tr className="table-allcell"  >
          <td className={`table-cell ${cellStatus}`}>{activity.username}</td>
          <td className={`table-cell ${cellStatus}`}>{activity.login_time}</td>
          <td className={`table-cell ${cellStatus}`}>{activity.logout_time}</td>
          <td className={`table-cell ${cellStatus}`}>{activity.id}</td>
        </tr>
      )
    } else return null;
}

export default Activity