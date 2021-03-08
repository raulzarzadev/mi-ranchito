import { H2, H3 } from '@cmps/H'
import { getUserEvents } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent } from '@raiz/src/utils'
import React, { useEffect, useState } from 'react'
import EventTable from '../EventTable'
import SelectedTitle from '../SelectedTitle'
import styles from './styles.module.css'

export default function UpcomingEvents() {
  const [events, setEvents] = useState(undefined)
  const [range, setRange] = useState(70)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const { user } = useAuth()

  const handleChangeRange = (newRange) => {
    const today = new Date().getDate()
    const todayInMs = new Date().getTime()
    const range = new Date().setDate(today + newRange)
    
    const filterdEvents = events?.filter((event) => {
      const nextEventDate = new Date(event.nextEvent?.date).getTime()
      return todayInMs < nextEventDate && nextEventDate < range
    })
    setUpcomingEvents(filterdEvents)
    setRange(newRange)
  }

  useEffect(() => {
    handleChangeRange(range)
  }, [events, range])

  useEffect(() => {
    if (user) {
      getUserEvents(user.id)
        .then((res) => {
          setEvents(res.map((event) => formatEvent(event)))
        })
        .catch((err) => {
          console.log(err)
          setEvents(null)
        })
    }
  }, [user])

  console.log(upcomingEvents)

  const selectOptions = [
    { label: '1 Semana', value: 7 },

    { label: '2 Semanas', value: 14 },
    { label: '1 Mes', value: 30 },
  ]

  if (events === undefined) return 'Loading...'
  return (
    <div>
      <H2>Proximos eventos</H2>
      <div className={styles.select_box}>
        {selectOptions.map((option) => (
          <SelectedTitle
            key={option.label}
            onClick={() => handleChangeRange(option.value)}
            selected={range === option.value}
            title={`${option.label}`}
          />
        ))}
      </div>
      {upcomingEvents?.length === 0 ? (
        <>
          <h3>No hay eventos proximos</h3>
        </>
      ) : (
        <>
          <EventTable events={upcomingEvents} upcomingEvents />
        </>
      )}
    </div>
  )
}
