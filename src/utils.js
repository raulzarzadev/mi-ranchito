import { EVENTS_TYPES } from '@raiz/constants/EVENTS_INFO'
import moment from 'moment'

export function formatedTypes() {
  return EVENTS_TYPES.map((event) => {
    const auxArr = []
    event.nextEvents.forEach((event) => {
      auxArr.push(EVENTS_TYPES.find(({ type }) => type === event))
    })
    return { ...event, nextEvents: auxArr }
  })
}

/* ----------------------------------------------------- */

export function formatType(type) {
  const events = EVENTS_TYPES.map((event) => {
    const auxArr = []
    event.nextEvents.forEach((event) => {
      auxArr.push(EVENTS_TYPES.find(({ type }) => type === event))
    })
    return { ...event, nextEvents: auxArr }
  })
  const event = events.find((evt) => evt.type === type)
  return event
}

export function formatDates(date) {
  return { date: new Date(date), formatDate: moment(date).format('WW / YY') }
}

export function formatNextEvents(events, mainDate) {
  const originDate = new Date(mainDate)
  return events?.map((event) => {
    console.log(event.onDay)
    const formatDate = moment(mainDate).add(event.onDay, 'd').format('WW / YY')
    const date = new Date(moment(originDate).add(event.onDay, 'd').format())
    return { date, formatDate, ...event }
  })
}

/* ----------------------------------------- */

export const formatEvent = (event = {}) => {
  const setTypes = formatType(event?.event)
  const setDates = formatDates(event?.date)
  const setNextEvents = formatNextEvents(setTypes?.nextEvents, event?.date)
  return {
    ...event,
    ...setTypes,
    ...setDates,
    nextEvents: setNextEvents,
    nextEvent: setNextEvents && setNextEvents[0],
  }
}

export function getToday() {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  const today = year + '-' + month + '-' + day
  return today
}
