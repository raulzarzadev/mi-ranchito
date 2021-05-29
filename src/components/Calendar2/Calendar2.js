import {
  MonthlyCalendar,
  DefaultMonthlyEventItem,
  MonthlyDay,
  useMonthlyBody,
  useMonthlyCalendar,
  MonthlyBody,
} from '@zach.codes/react-calendar'
import { useEffect, useState } from 'react'
import { addMonths, format, getYear, startOfMonth, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import c from './styles.module.css'
import e from './eventStyles.module.css'
import { useRouter } from 'next/router'

console.log('locale', es)

const MonthlyNav = () => {
  const { currentMonth, onCurrentMonthChange } = useMonthlyCalendar()

  return (
    <div className={c.month_nav}>
      <button
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
        className={c.month_prev}
      >
        Anterior
      </button>
      <div className={c.month_curr}>
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy',
          { locale: es }
        )}
      </div>
      <button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        className={c.month_nex}
      >
        Siguiente
      </button>
    </div>
  )
}

export default function Calendar({ events = [] }) {
  const router = useRouter()
  const [formatedEvent, setFormatedEvent] = useState([])
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))

  useEffect(() => {
    console.log('events', events)
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

    setFormatedEvent(mirrorEvents)
  }, [])

  const handleEventClick = (id) => {
    console.log('id', id)
    router.push(`/dashboard/events/${id}`)
  }

  return (
    <div className={c.calendar}>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody events={formatedEvent}>
          <MonthlyDay
            renderDay={(data) =>
              data.map((item, index) => (
                <CalendarEvent
                  key={index}
                  onClick={() => handleEventClick(item.id)}
                  event={item}
                />
              ))
            }
          ></MonthlyDay>
        </MonthlyBody>
      </MonthlyCalendar>
    </div>
  )
}

const CalendarEvent = ({ event, onClick }) => {
  const { earring, label, key, mirrorEvent } = event
  const BACKGROUND = {
    PALP: 'green',
    DRY: 'blue',
  }

  return (
    <div
      onClick={onClick}
      className={e.event}
      style={{ background: mirrorEvent ? BACKGROUND[key] : 'black' }}
    >
      <div>{earring}</div>
      <div>{label}</div>
    </div>
  )
}
