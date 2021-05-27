import {
  MonthlyBody,
  MonthlyCalendar,
  MonthlyNav,
  DefaultMonthlyEventItem,
  MonthlyDay,
} from '@zach.codes/react-calendar'
import { useEffect, useState } from 'react'
import { format, startOfMonth, subHours } from 'date-fns'
import c from './styles.module.css'
import e from './eventStyles.module.css'

export default function Calendar({ events = [] }) {
  useEffect(() => {
    console.log('events', events)
    const mirrorEvents = events.reduce((prev, curr) => {
      const original = curr
      const mirror = curr.upcomingEvents.map((event) => {
        return { ...event, id: curr.id }
      })
      console.log('mirror', mirror)

      return [...prev, mirror, original]
    }, [])

    setFormatedEvent(mirrorEvents.flat())
  }, [])
  /* 
              id: '1',
              earring: 'A-12',
              eventLabel: 'Parto',
              key: 'PARTO',
              date: subHours(new Date(), 2),
            },
             */
  const [formatedEvent, setFormatedEvent] = useState([])
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const handleEventClick = (id) => {
    console.log('id', id)
  }
  return (
    <div className={c.calendar}>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={(date) => setCurrentMonth(date)}
      >
        <MonthlyNav />
        <MonthlyBody
          events={formatedEvent}
          /*  
        renderDay={(data) =>
          data.map((item, index) => (
            <DefaultMonthlyEventItem
            key={index}
            title={item.title}
            date={item.date}
            />
            ))
          } 
          */
        >
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
  const { earring, label, key } = event
  const BACKGROUND = {
    PALP: 'green',
    DRY: 'blue',
  }

  return (
    <div
      onClick={onClick}
      className={e.event}
      style={{ background: BACKGROUND[key] || 'black' }}
    >
      <div>{earring}</div>
      <div>{label}</div>
    </div>
  )
}
