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

/* 

  /* const [formatEvents, setFormatEvents] = useState()
  useEffect(() => {
    const mirrorEvents = events.reduce((prev, curr) => {
      const original = curr

      const mirror = curr.upcomingEvents.map((event) => {
        const mirrorDate = curr.date + event.InDays * 24 * 60 * 60 * 1000 // dias en ms
        return {
          ...event,
          earring: curr.earring,
          id: curr.id,
          date: mirrorDate,
          mirrorEvent: true,
        }
      })

      return [...prev, mirror, original].flat()
    }, [])

    setFormatEvents(mirrorEvents)
  }, [view]) */

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

    const mirrorEvents = events.flat().reduce((prev, curr) => {
      if (!curr.upcomingEvents) return prev
      const mirror = curr?.upcomingEvents?.map((event) => {
        const mirrorDate = curr.date + event.InDays * 24 * 60 * 60 * 1000 // dias en meses
        const { earring, earringId, name = null, id } = curr
        return {
          ...event,
          cow: {
            earring,
            id: earringId,
            name,
          },
          id,
          date: mirrorDate,
          mirrorEvent: true,
        }
      })

      return [...prev, mirror, curr].flat()
    }, [])
    return mirrorEvents
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
