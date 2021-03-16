import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from '../services/axios'
import {AGENT_CLUB_API} from '../services/api_url'

import {PreLoaderContext} from '../contexts/PreLoaderContext'
export const ClubContext = createContext()

const ClubContextProvider = ({ children }) => {
  const { setIsLoading } = useContext(PreLoaderContext)

  const [clubs, setClubs] = useState([])

  // get all Club
  const getClubByUser = async () => {
    try {
      setIsLoading(true)
      let result = await axios.get(AGENT_CLUB_API)
      if (result.data.success) {
      setIsLoading(false)
        setClubs(result.data.data)
      }
    } catch (error) {
      setIsLoading(false)
      // console.error('Get All Club Error: ', error)
    }
  }

  useEffect(() => {
    getClubByUser()
  }, [])

  return <ClubContext.Provider value={{ clubs, setClubs }}>{children}</ClubContext.Provider>
}

export default ClubContextProvider