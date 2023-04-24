import React from 'react'
import { useSelector } from 'react-redux'
import "../../../styles/Table.css"
import { selectNotiTemperatureById } from './notitempApiSlice'

const Notitemp = ({notitempId}) => {
  const notitemp = useSelector(state => selectNotiTemperatureById(state, notitempId));
  if (notitemp){
    const cellStatus = notitemp.active ? '' : 'table__cell--inactive'

    return (
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{notitemp.temperature}</td>
        <td className={`table-cell ${cellStatus}`}>{notitemp.savetime}</td>
        

      </tr>
    )
  }else return null
  
   
}
  

export default Notitemp