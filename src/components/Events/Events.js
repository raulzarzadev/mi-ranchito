import EventTable from '@cmps/Tables/EventTable'
import { H2 } from '@cmps/Texts/H'
import { useState } from 'react'
import s from './styles.module.css'
import Calendar3 from '@cmps/Calendar3'
import Button from '@cmps/Inputs/Button'

export default function Events({ events = [] }) {
  const [view, setView] = useState('LIST')

  const handleChangeView = (view) => {
    setView(view)
  }

  return (
    <div className={s.events}>
      <H2>Eventos</H2>
      
      <div className={s.buttons_box}>
        <Button
          onClick={() => handleChangeView('LIST')}
          p="1"
          secondary={view === 'LIST'}
          primary
        >
          Lista
        </Button>
        <Button
          onClick={() => handleChangeView('WEEK')}
          p="1"
          secondary={view === 'WEEK'}
          primary
        >
          Semanal
        </Button>
        <Button
          onClick={() => handleChangeView('MONTH')}
          p="1"
          secondary={view === 'MONTH'}
          primary
        >
          Mensual
        </Button>
      </div>
      {view === 'WEEK' && <Calendar3 events={events} view={'semana'} />}
      {view === 'MONTH' && <Calendar3 events={events} view={'mes'} />}
      {view === 'LIST' && <EventTable events={events} />}
    </div>
  )
}
