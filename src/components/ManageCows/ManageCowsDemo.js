import React, { useState } from 'react'
import { EARRINGS } from '@raiz/HARD_DATA-COPY'

import DashboardDisplay from './DashboardDisplay'

export default function DemoManageCows({ demo }) {
  console.log(demo)

  const [earringsData, setEarringsData] = useState(EARRINGS)
  const [events, setEvents] = useState([])

  const handleAddEarring = (newEarring) => {
    setEarringsData([...earringsData, newEarring])
  }
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent])
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
