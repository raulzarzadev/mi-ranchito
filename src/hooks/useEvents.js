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

  const addEvent = (event) => {
    newEvent({ userId: user.id, ...event })
      .then((res) => console.log(res))
      .catch(setErrors)
  }
  const removeEvent = (eventId) => {
    deleteEvent(eventId)
      .then((res) => console.log(res))
      .catch(setErrors)
    getEvents(user.id)
  }
  const editEvent = (eventId, event) => {
    updateEvent(eventId, event).then((res) => console.log(res))
  }

  const getEvents = (userId) => {
    getUserEvents(userId).then(setEvents).catch(setErrors)
  }

  const getCowEvents = async (cowId) => {
    const events = await getEventsByCow(cowId)
      .then((res) => {
        return res
      })
      .catch((err) => console.log(err))
    const formatedEvents = events.map((event) => formatEvent(event))
    console.log(formatedEvents)
    return formatedEvents
    }
    
  useEffect(() => {
    if (user) {
      getEvents(user.id)
    }
  }, [user])

  const formatedEvents = events.map((event) => formatEvent(event))

  return {
    errors,
    events: formatedEvents,
    addEvent,
    removeEvent,
    editEvent,
    getCowEvents,
  }
}
