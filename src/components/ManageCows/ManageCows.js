import React, { useEffect, useState } from 'react'

import DashboardDisplay from './DashboardDisplay'
import {
  newCow,
  getUserCows,
  getUserEvents,
  newEvent,
} from '@raiz/firebaseClient'

export default function ManageCows({ demo }) {
  const [earringsData, setEarringsData] = useState([])
  const [events, setEvents] = useState([])

  const getEarrings = () => {
    const cows = getUserCows()
    return cows
  }
  const getEvents = () => {
    return getUserEvents()
  }

  useEffect(() => {
    getEarrings().then(setEarringsData)
    getEvents().then(setEvents)
  }, [])

  const handleAddEarring = async (newEarring) => {
    console.log(newEarring)
    // setEarringsData([...earringsData, newEarring])
    const res = await newCow(newEarring)
    console.log(res)
  }
  const handleAddEvent = (event) => {
    // setEvents([...events, event])
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
