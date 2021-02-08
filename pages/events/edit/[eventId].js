import Layout from '@cmps/Layout'
import NewEvent from '@cmps/NewEvent'
import { getEvent} from '@raiz/firebaseClient'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function EditCow() {
  const router = useRouter()
  const { eventId } = router?.query
  const [event, setEvent] = useState({})

  useEffect(() => {
    if (eventId) {
      getEvent(eventId).then(setEvent)
    }
  }, [eventId])

  return (
    <div>
      Editar Vaca
      <NewEvent editPage event={event} />
    </div>
  )
}

EditCow.Layout = Layout
