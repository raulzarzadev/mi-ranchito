import { deleteEvent, newEvent, updateEvent } from '@raiz/firebaseClient'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function useEvents() {
  const { user } = useAuth()
  const [errors, setErrors] = useState(null)

  const addEvent = (event) => {
    newEvent({ userId: user.id, ...event })
      .then((res) => console.log(res))
      .catch(setErrors)
  }
  const removeEvent = (eventId) => {
    deleteEvent(eventId)
      .then((res) => console.log(res))
      .catch(setErrors)
  }

  const editEvent = (eventId, event) => {
    updateEvent(eventId, event).then((res) => console.log(res))
  }

  return {
    errors,
    addEvent,
    removeEvent,
    editEvent,
  }
}
