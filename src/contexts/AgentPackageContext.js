import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import { AGENT_PACKAGE_API, PACKAGE_ALL_API } from '../services/api_url'
import PermissionHandler from 'services/permisionHandler'
export const PackagesContext = createContext()

const PackagesContextProvider = ({ children }) => {
  const [packages, setPackages] = useState([])
  useEffect(() => {
    permissionController()
  }, [])
  const permissionController = async () => {
    try {
      let permission = await PermissionHandler();
      if (permission.data.type === "admin") {
        getAllPackages(); //for admin
      } else {
        getPackagesByUser();//for agent
      }
    } catch (error) {
console.log(error)
    }
  }

  const getPackagesByUser = async () => {
    try {
      let result = await axios.get(AGENT_PACKAGE_API)
      if (result.data.success) {
        setPackages(result.data.data)
      }
    } catch (error) {
      console.log(error)
      // console.error('Get All Packages Error: ', error)
    }
  }

  const getAllPackages = async () => {
    try {
      let result = await axios.get(PACKAGE_ALL_API)
      if (result.data.success) {
        setPackages(result.data.data)

      }
    } catch (error) {
      alert("data fetching error")
    }
  }

  return <PackagesContext.Provider value={{ packages, setPackages }}>{children}</PackagesContext.Provider>
}

export default PackagesContextProvider