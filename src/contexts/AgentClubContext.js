import React, { createContext, useState, useEffect } from 'react'
import axios from '../services/axios'
import {AGENT_PACKAGE_API} from '../services/api_url'

export const ClubContext = createContext()

const ClubContextProvider = ({ children }) => {
  const [clubs, setClubs] = useState([])

  // get all Club
  const getClubByUser = async () => {
    try {
      let result = await axios.get(AGENT_PACKAGE_API)
      if (result.data.success) {
        setClub(result.data.data)
      }
    } catch (error) {
      // console.error('Get All Club Error: ', error)
    }
  }

  useEffect(() => {
    getClubByUser()
  }, [])

  return <ClubContext.Provider value={{ Club, setClub }}>{children}</ClubContext.Provider>
}

export default ClubContextProvider