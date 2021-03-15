import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditEvent() {
  const router = useRouter()
  const { getEvent } = useEvents()
  const { eventId } = router?.query
  const [event, setEvent] = useState(undefined)

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then(setEvent)
    }
  }, [eventId])
  console.log(event)

  if (event === undefined) return 'Cargando...'

  return (
    <>
      <h4>Editar Evento</h4>
      <NewEvent editPage event={event} />
    </>
  )
}

EditEvent.SecondaryLayout = DashboardCowsLayout
