import EventTable from '@cmps/Tables/EventTable'
import { H2 } from '@cmps/Texts/H'
import { useEffect, useState } from 'react'
import s from './styles.module.css'
import Calendar from '@cmps/Calendar'
import Button from '@cmps/Inputs/Button'
import { useRouter } from 'next/router'

export default function Events({ events = undefined }) {
  if (!events) return 'Cargando ...'
  const router = useRouter()

  const { query } = router
  console.log('query', query)

  const [view, setView] = useState( 'LIST')
  const handleChangeView = (view) => {
    setView(view)
    router.push(`?view=${view}`)
  }

  const [filter, setFilter] = useState(query.filter || 'ALL')
  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter)
    router.push(`?view=LIST&filter=${newFilter}`)
  }

  useEffect(()=>{
    query.filter && setFilter(query.filter)
    query.view && setView(query.view)
  },[query])

  const [eventsFiltered, setEventsFiltered] = useState([])

  useEffect(() => {
    const filters = {
      ALL: events,
      REAL: events.filter((event) => event.mirrorEvent !== true),
      MIRROR: events.filter((event) => event.mirrorEvent === true),
      UPCOMING: events.filter(({ date }) => date > new Date().getTime()),
      PASED: events.filter(({ date }) => date < new Date().getTime()),
    }
    setEventsFiltered(filters[filter])
  }, [filter])

  return (
    <div className={s.events}>
      Mostrar
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
          secondary={view === 'WEEK' && true}
          primary
        >
          Semanal
        </Button>
        <Button
          onClick={() => handleChangeView('MONTH')}
          p="1"
          secondary={view === 'MONTH' && true}
          primary
        >
          Mensual
        </Button>
      </div>
      {view === 'LIST' && (
        <>
          Filtrar
          <div className={s.buttons_box}>
            <Button
              onClick={() => handleChangeFilter('ALL')}
              p="1"
              secondary={filter === 'ALL'}
              primary
            >
              TODOS
            </Button>
            <Button
              onClick={() => handleChangeFilter('REAL')}
              p="1"
              secondary={filter === 'REAL'}
              primary
            >
              E. reales
            </Button>
            <Button
              onClick={() => handleChangeFilter('MIRROR')}
              p="1"
              secondary={filter === 'MIRROR'}
              primary
            >
              E. espejo
            </Button>
            <Button
              onClick={() => handleChangeFilter('UPCOMING')}
              p="1"
              secondary={filter === 'UPCOMING' && true}
              primary
            >
              Proximos
            </Button>
            <Button
              onClick={() => handleChangeFilter('PASED')}
              p="1"
              secondary={filter === 'PASED' && true}
              primary
            >
              Pasados
            </Button>
          </div>
        </>
      )}
      {view === 'WEEK' && <Calendar events={events} view={'semana'} />}
      {view === 'MONTH' && <Calendar events={events} view={'mes'} />}
      {view === 'LIST' && <EventTable events={eventsFiltered} />}
    </div>
  )
}
