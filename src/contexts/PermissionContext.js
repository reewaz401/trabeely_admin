import React, { createContext, useState, useEffect } from 'react'
import PermissionHandler from 'services/permisionHandler'

export const PermissionContext = createContext()

const PermissionContextProvider = ({ children }) => {
    const [granted, setGranted] = useState("")
   useEffect(() => {
      PermissionHandler().then(result => setGranted(result.data.type)).catch(err => console.log(err))
    }, [])

    return <PermissionContext.Provider value={{ granted, setGranted }}>{children}</PermissionContext.Provider>
}

export default PermissionContextProvider