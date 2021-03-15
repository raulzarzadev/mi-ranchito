import {
  fb_deleteEvent,
  fb_getEvent,
  fb_getUserEvents,
  fb_newEvent,
  fb_updateEvent,
} from '@raiz/firebase/client'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function useEvents() {
  const { user } = useAuth()
  const [errors, setErrors] = useState(null)

  const getEvents = () => {
    return fb_getUserEvents(user.id)
  }
  const addEvent = (event) => {
    fb_newEvent({ userId: user.id, ...event })
      .then((res) => console.log(res))
      .catch(setErrors)
  }
  const removeEvent = (eventId) => {
    fb_deleteEvent(eventId)
      .then((res) => console.log(res))
      .catch(setErrors)
  }

  const editEvent = (eventId, event) => {
    console.log(event)
    fb_updateEvent(eventId, event).then((res) => console.log(res))
  }
  const getEvent = (eventId) => {
    return fb_getEvent(eventId)
  }

  return {
    errors,
    addEvent,
    removeEvent,
    editEvent,
    getEvents,
    getEvent,
  }
}
