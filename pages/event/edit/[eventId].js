import Layout from '@cmps/Layout'
import NewEvent from '@cmps/NewEvent'
import { getEvent, getUserCows, updateEvent } from '@raiz/firebaseClient'
import { ALL_EVENTS } from '@raiz/HARD_DATA-COPY'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditCow() {
  const eventsAvaiblable = ALL_EVENTS
  const router = useRouter()
  const { eventId } = router?.query
  const [event, setEvent] = useState({})
  const [earringsData, setEarringsData] = useState([])

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then(setEvent)
      getUserCows(/* user */).then(setEarringsData)
    }
  }, [eventId])

  const handleUpdateEvent = (event) => {
    console.log(event, eventId)
    updateEvent(eventId, event).then((res) => console.log(res))
    /*  newEvent(event).then((res) => console.log(res)) */
    setTimeout(() => {
      router.push('/dashboard')
    }, 300)
  }
  console.log(event)

  return (
    <div>
      Editar Vaca
      <NewEvent
        handleAddEvent={handleUpdateEvent}
        eventsAvaiblable={eventsAvaiblable}
        earrings={earringsData}
        event={event}
      />
    </div>
  )
}

EditCow.Layout = Layout
