import {
  EVENTS_TYPES,
  EVENTS_TYPES_2,
  PERIODS,
} from '@raiz/constants/EVENTS_INFO'
import moment from 'moment'

export function formatedTypes() {
  return EVENTS_TYPES.map((event) => {
    const auxArr = []
    event.nextEvents.forEach((event) => {
      auxArr.push(EVENTS_TYPES_2.find(({ type }) => type === event))
    })
    return { ...event, nextEvents: auxArr }
  })
}

/* ----------------------------------------------------- */

function formatType(type) {
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

function formatDates(date) {
  return {
    date: new Date(date),
    formatDate: moment(date).format('DD MMM YY'),
    fromNow: moment(date).fromNow(),
  }
}

/*  --------------- FORMAT EVENTS ------------- */
export function formatEventsByEarrings(earrings = [], events = []) {
  return earrings.map((earring) => {
    const earringEvents = events.filter(
      (event) => event.earringId === earring.id
    )
    return formatEventsCow(earring, earringEvents)
  })
}

const setCowStatus = (events = []) => {
  const statuses = []

  // if (event === 'serv') statuses.push('gestante')

  /*  const prevEvent = evts[1]?.event
  const lastEvent = evts[0]?.event
  const auxArr = []
  if (lastEvent === 'serv' || lastEvent === 'palp' || lastEvent === 'seca')
    auxArr.push('gestante')
  if (lastEvent === 'parto') {
    auxArr.push('lactante')
  }
  if (prevEvent === 'parto' || lastEvent === 'palp') {
    auxArr.push('lactante')
  }
  if (lastEvent === 'seca') {
    const index = auxArr.indexOf('lactante')
    console.log(index)
    auxArr.splice(index, 1)
    auxArr.push('seca')
  }
  console.log(auxArr)
  return auxArr */
}

export function formatEventsCow(earring, events = []) {
  const registry = moment(earring.registryDate).fromNow()
  const evts = events
    .filter((event) => event.earringId === earring.id)
    .sort((a, b) => {
      if (a.date < b.date) return 1
      if (a.date > b.date) return -1
      return 0
    })
  const formatedEvents = evts?.map((event) => formatEvent(event))
  const lastEvent = (!!evts?.length && formatEvent(evts[0])) || undefined
  const statusEvents = evts?.filter((event) => event.eventClass === 'status')

  const statuses = setCowStatus(evts)
  return {
    ...earring,
    registry,
    statuses,
    statusEvents,
    events: formatedEvents,
    lastEventLabel: lastEvent?.label,
    lastEvent,
  }
}

export const formatEvent = (event = {}) => {
  const onDay = PERIODS[event.type || event.event]
  const date = event.date || new Date().getTime()

  const setTypes = formatType(event.type || event.event)
  const setDates = formatDates(date)
  const setNextEvents = formatNextEvents(setTypes?.nextEvents, date, onDay)
  return {
    ...event,
    ...setTypes,
    //  ...setDates,
    // onDay,
    // nextEvents: setNextEvents,
    // nextEvent: setNextEvents && setNextEvents[0],
  }
}

function formatNextEvents(events, mainDate, mainOnDay) {
  const originDate = mainDate
  return events?.map((event) => {
    const fromNow = moment(originDate)
      .add(event?.onDay - mainOnDay, 'd')
      .fromNow()
    const formatDate = moment(originDate)
      .add(event?.onDay - mainOnDay, 'd')
      .format('DD MMM YY')

    const date = new Date(
      moment(originDate)
        .add(event?.onDay - mainOnDay, 'd')
        .format()
    )

    return { date, formatDate, fromNow, ...event }
  })
}

/*  --------------- FORMAT EVENTS ------------- */

export function formatInputDate(date) {
  const format = moment(date).utc(false).format('YYYY-MM-DD')
  return format
}

export const fromNow = (date) => {
  return date ? moment(date).fromNow() : moment().fromNow()
}
