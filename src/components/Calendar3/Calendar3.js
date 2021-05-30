import Button from '@cmps/Inputs/Button'
import { H2 } from '@cmps/Texts/H'
import { format } from '@raiz/src/utils/Dates'
import { addWeeks, getWeek, getWeekYear, startOfWeek, subWeeks } from 'date-fns'

import { getWeekYearWithOptions } from 'date-fns/fp'
import { useEffect, useState } from 'react'
import s from './styles.module.css'

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { useRouter } from 'next/router'

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

  return (
    <div className={s.calendar}>
      <WeeklyCalendar events={formatEvents} />
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
  const [weekEvents, setWeekEvents] = useState()

  useEffect(() => {
    if (events) {
      const weekEvents = events.filter(
        (event) => getWeek(event.date) === getWeek(currWeek)
      )
      setWeekEvents(weekEvents)
    }
  }, [currWeek,events])

  const router = useRouter()
  const handleEventClick = (id) => {
    router.push(`/dashboard/events/${id}`)
  }

  return (
    <div>
      <div className={s.week_nav}>
        <Button p='1' primary icon onClick={handleSubWeek}>
            <ArrowBackIos />
        </Button>
        <div>
          <span className={s.nav_month}>
            {format(addWeeks(currWeek, 1), 'MMMM')}
          </span>
          <div>
            {`${format(currWeek, 'dd')} - ${format(
              addWeeks(currWeek, 1),
              'dd'
              )} `}
          </div>
        </div>
        <Button p='1' primary icon onClick={handleAddWeek}>
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
