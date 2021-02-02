import React, { useEffect, useState } from 'react'

import DashboardDisplay from './DashboardDisplay'
import {
  newCow,
  newEvent,
  getUserCows,
  getUserEvents,
} from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'

export default function ManageCows({ demo }) {
  const [earringsData, setEarringsData] = useState([])
  const [events, setEvents] = useState([])
  const { user } = useAuth()
  console.log(user)
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
  }, [])

  const handleAddEarring = (newEarring) => {
    getEarrings().then(setEarringsData)
    newCow(newEarring).then((res) => console.log(res))
  }
  const handleAddEvent = (event) => {
    console.log(event)
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
