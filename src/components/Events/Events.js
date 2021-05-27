import Calendar2 from '@cmps/Calendar2'
import EventTable from '@cmps/EventTable'
import { H2 } from '@cmps/H'
import { useState } from 'react'
import s from './styles.module.css'

export default function Events({ events = [] }) {
  const [display, setDisplay] = useState('LIST')
  return (
    <div className={s.events}>
      <H2>Eventos</H2>
      <div className={s.switch}>
        <div
          onClick={() => setDisplay('CALENDAR')}
          style={{ border: display === 'CALENDAR' && '1px solid' }}
        >
          Calendar
        </div>
        <div
          onClick={() => setDisplay('LIST')}
          style={{ border: display === 'LIST' && '1px solid' }}
        >
          List
        </div>
      </div>
      {display === 'CALENDAR' && <Calendar2 events={events} />}
      {display === 'LIST' && <EventTable events={events} />}
    </div>
  )
}
