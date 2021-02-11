import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import { getEvent } from '@raiz/firebaseClient'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditEvent() {
  const router = useRouter()
  const { eventId } = router?.query
  const [event, setEvent] = useState({})

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then(setEvent)
    }
  }, [eventId])
  console.log(event)

  return (
    <>
      Editar Vaca
      <NewEvent editPage event={event} />
    </>
  )
}

EditEvent.SecondaryLayout = DashboardCowsLayout
