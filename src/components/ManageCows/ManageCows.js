import React, { useEffect, useState } from 'react'

import DashboardDisplay from './DashboardDisplay'
import {
  newCow,
  newEvent,
  getUserCows,
  getUserEvents,
} from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'

export default function ManageCows({ demo }) {
  const [earringsData, setEarringsData] = useState([])
  const [events, setEvents] = useState([])
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setEvents([])
      setEarringsData([])
      router.replace('/')
    }
  }, [user])
  
  const getEarrings = () => {
    const cows = getUserCows(user?.id)
    return cows
  }
  const getEvents = () => {
    return getUserEvents(user?.id)
  }

  useEffect(() => {
    getEarrings().then(setEarringsData)
    getEvents().then(setEvents)
  }, [user])

  const handleAddEarring = (newEarring) => {
    getEarrings().then(setEarringsData)
    newCow(newEarring).then((res) => console.log(res))
  }
  const handleAddEvent = (event) => {
    getEvents().then(setEvents)
    newEvent(event).then((res) => console.log(res))
  }

  return (
    <DashboardDisplay
      events={events}
      earringsData={earringsData}
      handleAddEarring={handleAddEarring}
      handleAddEvent={handleAddEvent}
    />
  )
}
