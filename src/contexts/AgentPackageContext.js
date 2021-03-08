import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import {AGENT_PACKAGE_API} from '../services/api_url'

export const PackagesContext = createContext()

const PackagesContextProvider = ({ children }) => {
  const [packages, setPackages] = useState([])

  // get all Packages
  const getPackagesByUser = async () => {
    try {
      let result = await axios.get(AGENT_PACKAGE_API)
      if (result.data.success) {
        setPackages(result.data.packages)
      }
    } catch (error) {
      // console.error('Get All Packages Error: ', error)
    }
  }

  useEffect(() => {
    getPackagesByUser()
  }, [])

  return <PackagesContext.Provider value={{ packages, setPackages }}>{children}</PackagesContext.Provider>
}

export default PackagesContextProvider