import BtnLink from '@cmps/BtnLink/BtnLink'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import EventTable from '../EventTable'
import SelectedTitle from '../SelectedTitle'

export default function UpcomingEvents({ events }) {
  const [range, setRange] = useState('2week')
  const [upcomingEvents, setUpcomingEvents] = useState([])

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
    handleChangeRange(2, 'week')
  }, [events])


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BtnLink href={'/dashboard-cows/newEvent'} label="Nuevo Evento" />
        <BtnLink href={'/dashboard-cows/events'} label="Todos los eventos" />
      </div>
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
