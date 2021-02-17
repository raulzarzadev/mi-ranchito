import {
  deleteEvent,
  getUserEvents,
  newEvent,
  updateEvent,
  getEventsByCow,
} from '@raiz/firebaseClient'
import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatEvent } from '../utils'

export default function useEvents() {
  const { user } = useAuth()
  const [events, setEvents] = useState(undefined)
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
    getUserEvents(userId)
      .then((res) => {
        const formatedEvents = res.map((event) => formatEvent(event))
        setEvents(formatedEvents)
      })
      .catch((err) => {
        console.log(err)
        setEvents(null)
      })
  }


  return {
    errors,
    events,
    addEvent,
    removeEvent,
    editEvent,
  }
}
