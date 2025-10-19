import React, { useState } from 'react'
import { UserContext } from '../context/UserContext.js'

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username) => setUser({ name: username })
  const logout = () => setUser(null)
  const restApi = { url: 'http://localhost', port: 8000 }

  return (
    <UserContext.Provider value={{ user, login, logout, restApi }}>
      {children}
    </UserContext.Provider>
  )
}
