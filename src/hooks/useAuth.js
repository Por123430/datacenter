import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

import React from 'react'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isOfficer = false
  let isAdmin = false
  let status = "Officer"

  if (token) {
    const decoded = jwtDecode(token)
    const {  _id,username, roles, firstname, lastname,  } = decoded.UserInfo

    isOfficer = roles.includes('Officer')
    isAdmin = roles.includes('Admin')

    if (isOfficer) status= "Officer"
    if (isAdmin) status = "Admin"

    return { _id, username, roles, status, isOfficer, isAdmin, firstname, lastname,  }
  }

  return { _id: '', username: '', roles: [], isOfficer, isAdmin, status,  }
}

export default useAuth