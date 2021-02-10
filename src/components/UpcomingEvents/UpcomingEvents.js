import moment from 'moment'
import React, { useState } from 'react'
import EventTable from '../EventTable'
import SelectedTitle from '../SelectedTitle'

export default function UpcomingEvents({ events }) {
  const [range, setRange] = useState('week')
  let upcomingEvents = events.filter(
    (event) =>
      event.nextEvent?.date > moment().subtract(1, 'week') &&
      event.nextEvent?.date < moment().add(2, range)
  )

  const handleChangeRange = (range) => {
    setRange(range)
    upcomingEvents = events.filter(
      (event) =>
        event.nextEvent?.date > moment().subtract(1, 'week') &&
        event.nextEvent?.date < moment().add(2, range)
    )
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <SelectedTitle
          onClick={() => handleChangeRange('week')}
          selected={range === 'week'}
          title="2 semanas"
        />
        <SelectedTitle
          onClick={() => handleChangeRange('month')}
          selected={range === 'month'}
          title="2 meses"
        />
      </div>
      {upcomingEvents.length === 0 ? (
        <>
          <h3>No hay eventos proximos</h3>
        </>
      ) : (
        <>
          <EventTable
            title="Proximos..."
            events={upcomingEvents}
            upcomingEvents
          />
        </>
      )}
    </div>
  )
}
