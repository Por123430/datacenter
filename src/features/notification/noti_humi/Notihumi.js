import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotiHumiditiesById } from './notihumiApiSlice'
import "../../../styles/Table.css"
const Notihumi = ({ notihumiId }) => {
    const notihumi = useSelector(state => selectNotiHumiditiesById(state, notihumiId));
    if (notihumi){
        
  const date = new Date(notihumi.createdAt);
  const formattedDate = date.toLocaleString();
    const cellStatus = notihumi.active ? '' : 'table__cell--inactive'

    return (
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{notihumi.humidity}</td>
        <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
        

      </tr>
    )
  }else return null
  
   
}

export default Notihumi
