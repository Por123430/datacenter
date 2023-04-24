import React from 'react'
import { useGetSensorQuery } from './sensorApiSlice'
import "../../styles/Table.css"
import Sensor from './Sensor'
const SensorList = () => {
    const {
        data: sensor,
        isLoading,
        isSuccess,
        isError,
        error
      } = useGetSensorQuery()
      let content
    
      if (isLoading) content = <p>Loading...</p>
    
      if (isError) {
        content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message}</p>
      }
    
      if (isSuccess) {
        const { ids } = sensor
    
        const tableContent = ids?.length
            ? ids.map(sensorId => <Sensor key={sensorId} sensorId={sensorId} />)
            : null
        
      content = (
          <>   
          <table className="table-user" >
            <thead className="table__thead">
              <tr>
              <th scope="col" className="table__thuser__username">model</th>
                <th scope="col" className="table__thuser__username">temperature</th>
                <th scope="col" className="table__thuser__username">humidity</th>
                <th scope="col" className="table__thuser__username">edit</th>
              </tr>
            </thead>
            <tbody>
              {tableContent}
            </tbody>
          </table>
            {/* <div className="pre-next">
              <button onClick={() => previousPage()}>Previous</button>
              <button onClick={() => nextPage()}>Next</button>
            </div> */}
          </>
        )
      }
      return content
}

export default SensorList