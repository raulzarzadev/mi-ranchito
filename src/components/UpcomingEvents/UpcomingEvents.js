import { H2, H3 } from '@cmps/H'
import { getUserEvents } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent } from '@raiz/src/utils'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import EventTable from '../EventTable'
import SelectedTitle from '../SelectedTitle'
import styles from './styles.module.css'

export default function UpcomingEvents() {
  const [events, setEvents] = useState(undefined)
  const [range, setRange] = useState('1-week')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const { user } = useAuth()

  const handleChangeRange = (quantity, lapse) => {
    const rangeFromNow = moment().add(quantity, lapse)._d
    const filterdEvents = events.filter((event) => {
      console.log(rangeFromNow > event.nextEvent?.date)
      return rangeFromNow > event.nextEvent?.date
    })
    setUpcomingEvents(filterdEvents)
    setRange(`${quantity}-${lapse}`)
  }

  console.log(range)

  useEffect(() => {
    if (user) {
      getUserEvents(user.id)
        .then((res) => {
          setEvents(res.map((event) => formatEvent(event)))
          setUpcomingEvents(res.map((event) => formatEvent(event)))
        })
        .catch((err) => {
          console.log(err)
          setEvents(null)
        })
    }
  }, [user])

  console.log(upcomingEvents)

  const selectOptions = [
    { key: '1', label: 'Semana', type: 'week', quantity: 1 },
    { key: '2', label: 'Semanas', type: 'week', quantity: 2 },
    { key: '3', label: 'Mes', type: 'month', quantity: 1 },
    { key: '4', label: 'Meses', type: 'month', quantity: 2 },
    { key: '5', label: 'Meses', type: 'month', quantity: 5 },
  ]

  if (events === undefined) return 'Loading...'
  return (
    <div>
      <H2>Proximos eventos</H2>
      <div className={styles.select_box}>
        {selectOptions.map((option) => (
          <SelectedTitle
            key={option.key}
            onClick={() => handleChangeRange(option.quantity, option.type)}
            selected={range === `${option.quantity}-${option.type}`}
            title={`${option.quantity} ${option.label}`}
          />
        ))}
      </div>
      {upcomingEvents.length === 0 ? (
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
