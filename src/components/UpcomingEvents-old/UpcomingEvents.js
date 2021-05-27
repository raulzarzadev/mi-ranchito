import Calendar from '@cmps/Calendar2'
import { H2 } from '@cmps/H'
import { formatEvent } from '@raiz/src/utils'
import React, { useEffect, useState } from 'react'
import EventTable from '../EventTable-old'
import SelectedTitle from '../SelectedTitle'
import styles from './styles.module.css'

export default function UpcomingEvents({ events }) {
  useEffect(() => {
    if (events) {
      setUpcomingEvents(events.map((event) => formatEvent(event)))
    }
  }, [events])
  
  const [range, setRange] = useState(70)
  const [upcomingEvents, setUpcomingEvents] = useState([])

  const handleChangeRange = (newRange) => {
    const today = new Date().getDate()
    const SinceFrom = new Date().setDate(new Date().getDate() - 7)
    const range = new Date().setDate(today + newRange)
    const filterdEvents = events?.filter((event) => {
      const nextEventDate = new Date(event.nextEvent?.date).getTime()
      return SinceFrom < nextEventDate && nextEventDate < range
    })
    setUpcomingEvents(filterdEvents)
    setRange(newRange)
  }

  useEffect(() => {
    handleChangeRange(range)
  }, [events, range])

  const selectOptions = [
    { label: '1 Semana', value: 7 },
    { label: '2 Semanas', value: 14 },
    { label: '1 Mes', value: 30 },
  ]

  return (
    <div>
      <H2>Proximos eventos</H2>
      <Calendar events={events}/>
    </div>
  )
}
