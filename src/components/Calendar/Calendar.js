import Button from '@cmps/Inputs/Button'
import { format } from '@raiz/src/utils/Dates'
import {
  addDays,
  addMonths,
  addWeeks,
  getDayOfYear,
  getDaysInMonth,
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

export default function Calendar({ events = [], view = 'semana' }) {
  return (
    <div className={s.calendar}>
      {view === 'semana' && <WeeklyCalendar events={events} />}
      {view === 'mes' && <MontlyCalendar events={events} />}
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
      <CalendarNav handleAdd={handleAddMonth} handleSub={handleSubMonth}>
        <div>
          <span className={s.nav_month}>{format(currMonth, 'MMMM yy')}</span>
        </div>
      </CalendarNav>
      <DaysList daysList={daysList} handleEventClick={handleEventClick} />
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
      <CalendarNav handleAdd={handleAddWeek} handleSub={handleSubWeek}>
        <span className={s.nav_month}>{format(currWeek, 'MMMM yy')}</span>
        <div>
          {`${format(currWeek, 'dd')} - ${format(
            addWeeks(currWeek, 1),
            'dd'
          )} `}
        </div>
      </CalendarNav>
      <DaysList daysList={daysList} handleEventClick={handleEventClick} />
    </div>
  )
}

const CalendarNav = ({ handleAdd, handleSub, children }) => {
  return (
    <div>
      <div className={s.week_nav}>
        <Button p="1" primary icon onClick={handleAdd}>
          <ArrowBackIos />
        </Button>
        <div>{children}</div>
        <Button p="1" primary icon onClick={handleSub}>
          <ArrowForwardIos />
        </Button>
      </div>
      <div className={s.calendar_titles}>
        <em>arete </em>
        <em>evento</em>
        <em>variante </em>
        <em>comentarios</em>
      </div>
    </div>
  )
}

const DaysList = ({ daysList = [], handleEventClick }) => {
  const router = useRouter()
  const handleDayClick = (date) => {
    router.push(`/dashboard/events/new?date=${date}`)
  }
  return (
    <div className={s.days_body}>
      {daysList?.map((day, i) => (
        <div className={s.month_day} key={i}>
          <div className={s.month_number}>
            <span>
              {`${format(day?.date, 'd')} `}
              {day?.events?.length > 0
                ? format(day?.date, 'EEEE')
                : format(day.date, 'EEEEE')}
            </span>
            <Button
              onClick={() => handleDayClick(day.date)}
              className={s.add}
              addNew
              primary
            />
          </div>
          <div className={s.month_events}>
            {day?.events?.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const EventRow = ({ event, onClick }) => {
  const { variants, label, id, coments, cow } = event

  return (
    <button
      className={s.month_event}
      onClick={(e) => {
        e.preventDefault()
        onClick(id)
      }}
    >
      <div>
        <div>{cow.earring}</div>
        <em>{cow.name}</em>
      </div>
      <div>{label}</div>
      <div>{variants?.map((variant) => variant?.label) || '-'}</div>
      <div>{coments || ' - '}</div>
    </button>
  )
}
