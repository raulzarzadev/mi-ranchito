import Button from '@cmps/Inputs/Button'
import { format } from '@raiz/src/utils/Dates'
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'

import { useEffect, useState } from 'react'
import s from './styles.module.css'

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { H3 } from '@cmps/Texts/H'

export default function Calendar3({ events = [] }) {
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
  }, [])

  const handleChangeCalendarView = () => {
    calendarView === 'semana'
      ? setCalendarView('mes')
      : setCalendarView('semana')
  }

  const [calendarView, setCalendarView] = useState('semana')

  console.log('calendarView', calendarView)

  return (
    <div className={s.calendar}>
      {calendarView === 'semana' && (
        <WeeklyCalendar
          events={formatEvents}
          onClickTitle={handleChangeCalendarView}
        />
      )}
      {calendarView === 'mes' && (
        <MontlyCalendar
          events={formatEvents}
          onClickTitle={handleChangeCalendarView}
        />
      )}
    </div>
  )
}

const MontlyCalendar = ({ events, onClickTitle }) => {
  const router = useRouter()
  const [currMonth, setCurrMonth] = useState(startOfMonth(new Date()))

  const handleAddMonth = () => {
    setCurrMonth(addMonths(currMonth, 1))
  }
  const handleSubMonth = () => {
    setCurrMonth(subMonths(currMonth, 1))
  }
  const [monthEvents, setMonthEvents] = useState([])

  useEffect(() => {
    if (events) {
      const monthEvents = events.filter(
        (event) => getMonth(event.date) === getMonth(currMonth)
      )
      setMonthEvents(monthEvents)
    }
  }, [currMonth, events])

  console.log('currMonth', currMonth)

  const handleEventClick = (id) => {
    router.push(`/dashboard/events/${id}`)
  }
  const [daysList, setDaysList] = useState([])
  useEffect(() => {
    const arr = []
    for (let i = 0; i < getDaysInMonth(currMonth); i++) {
      const evts = monthEvents.filter(
        (event) => getDate(event.date) === i
      )
      arr.push({
        date: addDays(currMonth, i),
        events: evts,
      })
    }
    setDaysList(arr)
  }, [currMonth])
  console.log('daysList', daysList)
  /*  [
    {date,
    events}
  ] */

  return (
    <div>
      <div className={s.week_nav}>
        <Button p="1" primary icon onClick={handleSubMonth}>
          <ArrowBackIos />
        </Button>
        <div onClick={onClickTitle}>
          <span className={s.nav_month}>{format(currMonth, 'MMMM')}</span>
          <H3>Mes</H3>
        </div>
        <Button p="1" primary icon onClick={handleAddMonth}>
          <ArrowForwardIos />
        </Button>
      </div>
      <div className={s.month_body}>
        {daysList?.map(({ events, date }, i) => (
          <div className={s.month_day} key={i}>
            <div className={s.month_number}>{format(date, 'd')}</div>
            <div className={s.month_events}>
              {events?.map((event) => (
                <MonthEvent key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const WeeklyCalendar = ({ events, onClickTitle }) => {
  const [currMonth, setCurrMonth] = useState(startOfWeek(new Date()))

  const handleAddWeek = () => {
    setCurrMonth(addWeeks(currMonth, 1))
  }
  const handleSubWeek = () => {
    setCurrMonth(subWeeks(currMonth, 1))
  }
  const [weekEvents, setWeekEvents] = useState()

  useEffect(() => {
    if (events) {
      const weekEvents = events.filter(
        (event) => getWeek(event.date) === getWeek(currMonth)
      )
      setWeekEvents(weekEvents)
    }
  }, [currMonth, events])

  const router = useRouter()
  const handleEventClick = (id) => {
    router.push(`/dashboard/events/${id}`)
  }

  return (
    <div>
      <div className={s.week_nav}>
        <Button p="1" primary icon onClick={handleSubWeek}>
          <ArrowBackIos />
        </Button>
        <div onClick={onClickTitle}>
          <span className={s.nav_month}>
            {format(addWeeks(currMonth, 1), 'MMMM')}
          </span>
          <H3>semana</H3>
          <div>
            {`${format(currMonth, 'dd')} - ${format(
              addWeeks(currMonth, 1),
              'dd'
            )} `}
          </div>
        </div>
        <Button p="1" primary icon onClick={handleAddWeek}>
          <ArrowForwardIos />
        </Button>
      </div>
      <div className={s.week_body}>
        {weekEvents?.map((event) => (
          <WeekEvent key={event.id} event={event} onClick={handleEventClick} />
        ))}
      </div>
    </div>
  )
}

const MonthEvent = ({ event, onClick }) => {
  const { date, label, earring, id } = event
  return (
    <button
      className={s.month_event}
      onClick={(e) => {
        e.preventDefault()
        onClick(id)
      }}
    >
      <div>{label}</div>
      <div>{earring}</div>
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
      <div>{format(date, 'EEE dd')}</div>
      <div>{label}</div>
      <div>{earring}</div>
    </button>
  )
}
