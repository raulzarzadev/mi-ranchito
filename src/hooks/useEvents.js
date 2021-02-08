import { deleteEvent, getUserEvents, newEvent } from '@raiz/firebaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatEvent } from '../utils'

export default function useEvents() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [errors, setErrors] = useState(null)

  const addEvent = (event) => {
    newEvent(event)
      .then((res) => console.log(res))
      .catch(setErrors)
  }
  const removeEvent = (eventId) => {
    deleteEvent(eventId)
      .then((res) => console.log(res))
      .catch(setErrors)
  }

  const getEvents = (userId) => {
    getUserEvents(userId).then(setEvents).catch(setErrors)
  }

  useEffect(() => {
    if (user) {
      getEvents(user.id)
    }
  }, [user])

  const formatedEvents = events.map((event) => formatEvent(event))
  
  return { errors, events, formatedEvents, addEvent, removeEvent }
}
