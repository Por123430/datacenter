import { store } from '../../app/store'
import { usersApiSlice } from '../users/userApiSlice'
import { sensorApiSlice } from '../sensor/sensorApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import React from 'react'

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    const sensor = store.dispatch(sensorApiSlice.endpoints.getSensor.initiate())
    return () => {
        console.log('unsubscribing')
        users.unsubscribe()
        sensor.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch