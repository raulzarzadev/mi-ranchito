import {
  fb_deleteEvent,
  fb_getEvent,
  fb_newEvent,
  fb_updateEvent,
} from '@raiz/firebase/client'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Event } from '../utils/Event'
import useCows from './useCows'

export default function useEvents() {
  const { user } = useAuth()
  const { getCows } = useCows()
  const [errors, setErrors] = useState(null)

  const getEvents = async () => {
    const cows = await getCows()
    const events = cows.map((cow) =>
      cow.events.map((event) => {
        return {
          earringId: cow.id,
          earring: cow.earring,
          cow: {
            id: cow.id,
            name: cow.name,
            earring: cow.earring,
          },
          ...event,
        }
      })
    )

    return events.flat()

    /*     const events = await fb_getUserEvents(user.id)
    const formatedEvents = events.map((event) => Event(event))
    return formatedEvents */
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
    fb_updateEvent(eventId, event).then((res) => console.log(res))
  }
  const getEvent = async (eventId) => {
    const event = await fb_getEvent(eventId)
    return Event(event)
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
