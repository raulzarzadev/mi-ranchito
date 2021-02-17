import { getUserEvents } from '@raiz/firebaseClient'
import { useAuth } from '@raiz/src/context/AuthContext'
import { formatEvent } from '@raiz/src/utils'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import EventTable from '../EventTable'
import SelectedTitle from '../SelectedTitle'

export default function UpcomingEvents() {
  
  const [events, setEvents] = useState(undefined)
  const [range, setRange] = useState('2week')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const { user } = useAuth()

  const handleChangeRange = (quatity, range) => {
    setRange(quatity + range)
    setUpcomingEvents(
      events.filter(
        (event) =>
          event.nextEvent?.date > moment().subtract(1, 'week') &&
          event.nextEvent?.date < moment().add(quatity, range)
      )
    )
  }

  useEffect(() => {
    if (user) {
      getUserEvents(user.id)
        .then((res) => {
          setEvents(res)
          setUpcomingEvents(res.map((event) => formatEvent(event)))
        })
        .catch((err) => {
          console.log(err)
          setEvents(null)
        })
    }
  }, [user])


  if (events === undefined) return 'Loading...'

  return (
    <div>
      <h2>En las proximas..</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <SelectedTitle
          onClick={() => handleChangeRange(2, 'week')}
          selected={range === '2week'}
          title="2 semanas"
        />
        <SelectedTitle
          onClick={() => handleChangeRange(1, 'month')}
          selected={range === '1month'}
          title="1 mes"
        />

        <SelectedTitle
          onClick={() => handleChangeRange(2, 'month')}
          selected={range === '2month'}
          title="2 meses"
        />
        <SelectedTitle
          onClick={() => handleChangeRange(3, 'month')}
          selected={range === '3month'}
          title="3 meses"
        />
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
