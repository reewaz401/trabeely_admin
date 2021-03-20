import React, { createContext, useState, useEffect } from 'react'
import PermissionHandler from 'services/permisionHandler'

export const PermissionContext = createContext()

const PermissionContextProvider = ({ children }) => {
    const [granted, setGranted] = useState([])
    useEffect(() => {
        PermissionHandler()
            .then(result => setGranted(result))
            .catch(err => { return false })
    }, [])

    return <PermissionContext.Provider value={{ granted, setGranted }}>{children}</PermissionContext.Provider>
}

export default PermissionContextProvider