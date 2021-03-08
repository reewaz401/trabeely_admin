import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import {AGENT_HOTEL_API} from '../services/api_url'

export const HotelContext = createContext()

const HotelContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState([])
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
  useEffect(() => {
    getHotelDetails()
  }, [])

  return <HotelContext.Provider value={{ hotels, setHotels }}>{children}</HotelContext.Provider>
}

export default HotelContextProvider