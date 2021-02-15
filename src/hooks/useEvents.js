import {
  deleteEvent,
  getUserEvents,
  newEvent,
  updateEvent,
  getEventsByCow,
} from '@raiz/firebaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatEvent } from '../utils'

export default function useEvents() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (user) {
      getEvents(user.id)
    }
  }, [user])

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

  const getEvents = async (userId) => {
    getUserEvents(userId).then((res) => setEvents(res))
  }

  const [formatedEvents, setFormatedEvents] = useState([])
  useEffect(() => {
    if (events.length) {
      setFormatedEvents(events.map((event) => formatEvent(event)))
    }
  }, [events])

  console.log(events, formatedEvents)
  return {
    errors,
    events: formatedEvents,
    addEvent,
    removeEvent,
    editEvent,
    // getCowEvents,
  }
}
