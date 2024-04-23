import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from './userApiSlice'
import SettingUserForm from './SettingUserForm'
const SettingUser = () => {
  const { id } = useParams()

  const user = useSelector(state => selectUserById(state, id))

  const content = user ? <SettingUserForm user={user} /> : <p>Loading...</p>
  return content
}

export default SettingUser