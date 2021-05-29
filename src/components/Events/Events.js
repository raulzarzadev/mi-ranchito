import Calendar2 from '@cmps/Calendar2'
import EventTable from '@cmps/EventTable'
import { H2 } from '@cmps/H'
import Switch from '@cmps/Switch'
import { useState } from 'react'
import s from './styles.module.css'

export default function Events({ events = [] }) {
  const [display, setDisplay] = useState('LIST')
  const handleViewOption = (opt) => {
    const { checked } = opt.target
    setDisplay(!checked ? 'LIST' : 'CALENDAR')
  }

  return (
    <div className={s.events}>
      <H2>Eventos</H2>
      <div className={s.switch}>
        <Switch
          label={display === 'LIST' ? 'Calendario' : 'Lista'}
          labelLeft="Calendario"
          onChange={handleViewOption}
        />
      </div>
      {display === 'CALENDAR' && <Calendar2 events={events} />}
      {display === 'LIST' && <EventTable events={events} />}
    </div>
  )
}
