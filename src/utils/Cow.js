import { EVENTS_TYPES_2, PERIODS } from '@raiz/constants/EVENTS_INFO'

/*  This function will create a complite COW element  */
export const Cow = (cow = {}, events = []) => {
  // console.log('events, cow', events, cow)

  const { id, earring, createdAt, name, registryDate, userId, birth } = cow
  const details = {
    id,
    earring,
    createdAt,
    name,
    registryDate,
    userId,
    birth,
  }

  const _formatEvent = (event) => {
    console.log('event', event)
    console.log(EVENTS_TYPES_2.find(({ key }) => key === event.key))

    /* 
    return { label, id, date, options, coments } */
  }

  const eventsSorted = events.sort((a, b) => a.date - b.date)
  const formatedEvents = eventsSorted.map((event) => _formatEvent(event))
  const lastEvent = eventsSorted[eventsSorted.length - 1]
  const previusEvent = eventsSorted[eventsSorted.length - 2]

  /*  console.log('a', a)
  console.log('lastEvent', lastEvent)
  console.log('previusEvent', previusEvent)
 */
  return {
    upcomingEvents: [],
    events: eventsSorted,
    statuses: [],
    lastEvent: {},
    ...details,
  }
}
