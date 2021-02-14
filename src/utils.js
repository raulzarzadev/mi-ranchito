import { EVENTS_TYPES, PERIODS } from '@raiz/constants/EVENTS_INFO'
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

function formatNextEvents(events, mainDate, mainOnDay) {
  const originDate = mainDate
  return events?.map((event) => {
    const fromNow = moment(originDate)
      .add(event.onDay - mainOnDay, 'd')
      .fromNow()
    const formatDate = moment(originDate)
      .add(event.onDay, 'd')
      .format('DD MMM YY')
    const date = new Date(moment(originDate).add(event.onDay, 'd').format())
    return { date, formatDate, fromNow, ...event }
  })
}

/* ----------------------------------------- */

export function formatEventsByEarring(events, earrings) {
  return earrings.map((earring) => {
    const age = moment(earring.birth).fromNow()
    const evts = events.filter((event) => event.earring === earring.earring)
    const sortedEvts = evts.sort((a, b) => {
      if (a.date < b.date) return 1
      if (a.date > b.date) return -1
      return 0
    })
    return {
      ...earring,
      age,
      events: sortedEvts,
      upcomingEvents: sortedEvts[0]?.nextEvents,
      lastEvent: sortedEvts[0] || null,
      lastEventLabel: sortedEvts[0]?.label || '-',
    }
  })
}

export const formatEvent = (event = {}) => {
  const onDay = PERIODS[event.type || event.event]
  const date = event.date || new Date()
  const setTypes = formatType(event.type || event.event)
  const setDates = formatDates(date)
  const setNextEvents = formatNextEvents(setTypes?.nextEvents, date, onDay)
  return {
    ...event,
    ...setTypes,
    ...setDates,
    onDay,
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
export function formatInputDate(date) {
  const dateObj = date ? new Date(date) : new Date()
  let day = dateObj.getDate()
  let month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  const today = year + '-' + month + '-' + day
  return today
}

/* --------------------------Funciones usadas una vez--------------------------------- */

const updateEarringsToIncludeEarringId = async () => {
  // Se creo est afuncion para acutlaulzar los eventos y que incluyan el id delearrign y no solo el numero del arete
  const aretes = await db
    .collection('cows')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    })
  // console.log(earr)
  const events = await db
    .collection('events')
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )

  events.forEach((event) => {
    const owner = aretes.find((arete) => arete.earring === event.earring)
    const newE = { ...event, earringId: owner.id }
    // updateEvent(newE.id, newE)
  })
}
