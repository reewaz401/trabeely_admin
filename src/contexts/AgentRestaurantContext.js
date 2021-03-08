import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import {AGENT_RESTAURANT_API} from '../services/api_url'

export const RestaurantContext = createContext()

const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const RestaurantDetails = async () => {
    try {
      let result = await axios.get(AGENT_RESTAURANT_API)
      if (result.data.success) {
        setRestaurants(result.data.data)
      }
    } catch (error) {
      // console.error('Get All Restaurant Error: ', error)
    }
  }
  useEffect(() => {
    RestaurantDetails()
  }, [])

  return <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>{children}</RestaurantContext.Provider>
}

export default RestaurantContextProvider