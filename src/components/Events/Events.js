import EventTable from '@cmps/Tables/EventTable'
import { H2 } from '@cmps/Texts/H'
import Switch from '@cmps/Inputs/Switch'
import { useState } from 'react'
import s from './styles.module.css'
import Calendar3 from '@cmps/Calendar3'

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
      {display === 'CALENDAR' && <Calendar3 events={events} />}
      {display === 'LIST' && <EventTable events={events} />}
    </div>
  )
}
