import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectSensorById } from './sensorApiSlice'
import EditSensorForm from './EditSensorForm'

const EditSensor = () => {
    const { id } = useParams()

    const sensor = useSelector(state => selectSensorById(state, id))
  
    const content = sensor ? <EditSensorForm sensor={sensor} /> : <p>Loading...</p>
    return content
}

export default EditSensor