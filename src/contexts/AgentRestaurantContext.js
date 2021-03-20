import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import { AGENT_RESTAURANT_API, RESTAURANT_ALL_API } from '../services/api_url'
import PermissionHandler from 'services/permisionHandler'

export const RestaurantContext = createContext()

const RestaurantContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    permissionController()
  }, [])
  const permissionController = async () => {
    let permission = await PermissionHandler();
    if (permission.data.type === "admin") {
      getAllRestaurant(); //for admin
    } else {
      getRestaurantByUser();//for agent
    }
  }


  const getRestaurantByUser = async () => {
    try {
      let result = await axios.get(AGENT_RESTAURANT_API)
      if (result.data.success) {
        setRestaurants(result.data.data)
      }
    } catch (error) {
      // console.error('Get All Restaurant Error: ', error)
    }
  }
  const getAllRestaurant = async () => {
    try {
      let result = await axios.get(RESTAURANT_ALL_API)
      if (result.data.success) {
        setRestaurants(result.data.data)
      }
    } catch (error) {
      // console.error('Get All Restaurant Error: ', error)
    }
  }
  useEffect(() => {
    getRestaurantByUser()
  }, [])

  return <RestaurantContext.Provider value={{ restaurants, setRestaurants }}>{children}</RestaurantContext.Provider>
}

export default RestaurantContextProvider