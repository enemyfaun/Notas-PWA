import React, { useState } from 'react'
import { UserContext } from '../context/UserContext.js'

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username) => setUser({ name: username })
  const logout = () => setUser(null)
  const restApi = { url: 'https://app-notas-pwa-953307761535.northamerica-south1.run.app', port: '' }

  return (
    <UserContext.Provider value={{ user, login, logout, restApi }}>
      {children}
    </UserContext.Provider>
  )
}
