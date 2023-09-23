import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotiLightById } from './notilightApiSlice'
import"../../../styles/Table.css"
const Notilight = ({notilightId, searchQuery }) => {
  const notilight = useSelector(state => selectNotiLightById(state, notilightId));
    if (notilight){
      const date = new Date(notilight.createdAt);
  const formattedDate = date.toLocaleString();
    const cellStatus = notilight.active ? '' : 'table__cell--inactive'

    if (!searchQuery || notilight.flame.includes(searchQuery) || formattedDate.includes(searchQuery)) {
    return (
      <tr className="table-allcell">
        <td className={`table-cell ${cellStatus}`}>{notilight.flame}</td>
        <td className={`table-cell ${cellStatus}`}>{formattedDate}</td>
        

      </tr>
    )
  } else {
    return null;
  }
  }else return null
}

export default Notilight