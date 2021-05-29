import {
  MonthlyCalendar,
  DefaultMonthlyEventItem,
  MonthlyDay,
  useMonthlyBody,
  useMonthlyCalendar,
  MonthlyBody,
} from '@zach.codes/react-calendar'
import { useEffect, useState } from 'react'
import {
  addMonths,
  format,
  getYear,
  startOfMonth,
  subHours,
  subMonths,
} from 'date-fns'
import c from './styles.module.css'
import e from './eventStyles.module.css'
import { useRouter } from 'next/router'

const MonthlyNav = () => {
  const { currentMonth, onCurrentMonthChange } = useMonthlyCalendar()

  return (
    <div className="flex justify-center rounded-b-xl m-4 p-2 text-white bg-black  sticky  top-0 ">
      <button
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
        className="cursor-pointer"
      >
        Previous
      </button>
      <div className="ml-4 mr-4 w-32 text-center">
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy'
        )}
      </div>
      <button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        className="cursor-pointer"
      >
        Next
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
