import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('_auth'))

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return user !== null ? true : false
  })
  const [authUser, setAuthUser] = useState(() => {
    return user !== null ? user : {}
  })
  return <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, authUser, setAuthUser }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
