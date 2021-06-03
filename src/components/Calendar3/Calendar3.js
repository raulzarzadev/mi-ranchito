import Button from '@cmps/Inputs/Button'
import { format } from '@raiz/src/utils/Dates'
import {
  addDays,
  addMonths,
  addWeeks,
  getDate,
  getDay,
  getDayOfYear,
  getDaysInMonth,
  getMonth,
  getWeek,
  getYear,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'

import { useEffect, useState } from 'react'
import s from './styles.module.css'

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useRouter } from 'next/router'

export default function Calendar3({ events = [], view = 'semana' }) {
  const [formatEvents, setFormatEvents] = useState()
  useEffect(() => {
    const mirrorEvents = events.reduce((prev, curr) => {
      const original = curr

      const mirror = curr.upcomingEvents.map((event) => {
        const mirrorDate = curr.date + event.InDays * 24 * 60 * 60 * 1000 // dias en ms
        return {
          ...event,
          earring: curr.earring,
          id: curr.id,
          date: mirrorDate,
          mirrorEvent: true,
        }
      })

      return [...prev, mirror, original].flat()
    }, [])

    setFormatEvents(mirrorEvents)
  }, [view])

  return (
    <div className={s.calendar}>
      {view === 'semana' && <WeeklyCalendar events={formatEvents} />}
      {view === 'mes' && <MontlyCalendar events={formatEvents} />}
    </div>
  )
}

const MontlyCalendar = ({ events }) => {
  const router = useRouter()
  const [currMonth, setCurrMonth] = useState(startOfMonth(new Date()))
  const [daysList, setDaysList] = useState([])

  const handleAddMonth = () => {
    setCurrMonth(addMonths(currMonth, 1))
  }
  const handleSubMonth = () => {
    setCurrMonth(subMonths(currMonth, 1))
  }

  const handleEventClick = (id) => {
    router.push(`/dashboard/events/${id}`)
  }

  useEffect(() => {
    const dayList = []
    if (events) {
      for (let i = 0; i < getDaysInMonth(currMonth); i++) {
        const day = { date: addDays(new Date(currMonth), i) }
        const dayEvents = events.filter(
          (event) =>
            getDayOfYear(event.date) === getDayOfYear(day.date) &&
            getYear(event.date) === getYear(day.date)
        )
        dayList.push({ ...day, events: dayEvents })
      }
    }
    setDaysList(dayList)
  }, [currMonth, events])

  return (
    <div>
      <div className={s.week_nav}>
        <Button p="1" primary icon onClick={handleSubMonth}>
          <ArrowBackIos />
        </Button>
        <div>
          <span className={s.nav_month}>{format(currMonth, 'MMMM yy')}</span>
        </div>
        <Button p="1" primary icon onClick={handleAddMonth}>
          <ArrowForwardIos />
        </Button>
      </div>
      <div className={s.month_body}>
        {daysList?.map((day, i) => (
          <div className={s.month_day} key={i}>
            <div className={s.month_number}>
              <span>
                {`${format(day?.date, 'd')} `}
                {day?.events?.length > 0
                  ? format(day?.date, 'EEEE')
                  : format(day.date, 'EEEEE')}
              </span>
            </div>
            <div className={s.month_events}>
              {day?.events?.map((event) => (
                <MonthEvent
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WeeklyCalendar = ({ events }) => {
  const [currWeek, setCurrWeek] = useState(startOfWeek(new Date()))

  const handleAddWeek = () => {
    setCurrWeek(addWeeks(currWeek, 1))
  }
  const handleSubWeek = () => {
    setCurrWeek(subWeeks(currWeek, 1))
  }

  const router = useRouter()
  const handleEventClick = (id) => {
    router.push(`/dashboard/events/${id}`)
  }
  const [daysList, setDaysList] = useState()

  useEffect(() => {
    const dayList = []
    if (events) {
      for (let i = 0; i < 8; i++) {
        const day = { date: addDays(new Date(currWeek), i) }
        const dayEvents = events.filter(
          (event) =>
            getDayOfYear(event.date) === getDayOfYear(day.date) &&
            getYear(event.date) === getYear(day.date)
        )
        dayList.push({ ...day, events: dayEvents })
      }
    }
    setDaysList(dayList)
  }, [currWeek, events])

  

  return (
    <div>
      <div className={s.week_nav}>
        <Button p="1" primary icon onClick={handleSubWeek}>
          <ArrowBackIos />
        </Button>
        <div>
          <span className={s.nav_month}>{format(currWeek, 'MMMM yy')}</span>
          <div>
            {`${format(currWeek, 'dd')} - ${format(
              addWeeks(currWeek, 1),
              'dd'
            )} `}
          </div>
        </div>
        <Button p="1" primary icon onClick={handleAddWeek}>
          <ArrowForwardIos />
        </Button>
      </div>
      <div className={s.week_body}>
        {daysList?.map((day, i) => (
          <div className={s.month_day} key={i}>
            <div className={s.month_number}>
              <span>
                {`${format(day?.date, 'd')} `}
                {day?.events?.length > 0
                  ? format(day?.date, 'EEEE')
                  : format(day.date, 'EEEEE')}
              </span>
            </div>
            <div className={s.month_events}>
              {day?.events?.map((event) => (
                <MonthEvent
                  key={event.id}
                  event={event}
                  onClick={handleEventClick}
                />
              ))}
            </div>
          </div>
        ))}
        {/*  {weekEvents?.length === 0 && 'Sin Eventos'}
        {weekEvents?.map((event) => (
          <WeekEvent key={event.id} event={event} onClick={handleEventClick} />
        ))} */}
      </div>
    </div>
  )
}

const MonthEvent = ({ event, onClick }) => {
  const { variants, label, earring, id, coments } = event
  return (
    <button
      className={s.month_event}
      onClick={(e) => {
        e.preventDefault()
        onClick(id)
      }}
    >
      <div>{earring}</div>
      <div>{label}</div>
      <div>{variants?.map((variant) => variant?.label)}</div>
      <div>{coments || ' - '}</div>
    </button>
  )
}

const WeekEvent = ({ event, onClick = () => {} }) => {
  const { date, label, earring, id } = event
  return (
    <button
      className={s.week_event}
      onClick={(e) => {
        e.preventDefault()
        onClick(id)
      }}
    >
      <div>{earring}</div>
      <div>{label}</div>
      <div>{format(date, 'EEE dd')}</div>
    </button>
  )
}
