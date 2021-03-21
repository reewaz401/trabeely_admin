import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import { AGENT_HOTEL_API, HOTEL_ALL_API } from '../services/api_url'
import PermissionHandler from 'services/permisionHandler'

export const HotelContext = createContext()

const HotelContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    permissionController()
  }, [])
  const permissionController = async () => {
    try {
      let permission = await PermissionHandler();
      if (permission.data.type === "admin") {
        getAllHotels(); //for admin
      } else {
        getHotelDetails();//for agent
      }
    } catch (error) {

    }
  }

  const getHotelDetails = async () => {
    try {
      let result = await axios.get(AGENT_HOTEL_API)
      if (result.data.success) {
        setHotels(result.data.data)
      }
    } catch (error) {
      // console.error('Get All Hotel Error: ', error)
    }
  }

  const getAllHotels = async () => {
    try {
      let result = await axios.get(HOTEL_ALL_API)
      console.log(result)
      if (result.data.success) {
        setHotels(result.data.data)
      }
    } catch (error) {
      alert("data fetching error")
    }
  }

  return <HotelContext.Provider value={{ hotels, setHotels }}>{children}</HotelContext.Provider>
}

export default HotelContextProvider