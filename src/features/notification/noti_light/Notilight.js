import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotiLightById } from './notilightApiSlice'
import"../../../styles/Table.css"
const Notilight = ({notilightId}) => {
  const notilight = useSelector(state => selectNotiLightById(state, notilightId));
    if (notilight){
      const date = new Date(notilight.createdAt);
  const formattedDate = date.toLocaleString();
    const cellStatus = notilight.active ? '' : 'table__cell--inactive'

    return (
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{notilight.flame}</td>
        <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
        

      </tr>
    )
  }else return null
}

export default Notilight
