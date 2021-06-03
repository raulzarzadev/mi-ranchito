import { Event } from './Event'

/*  This function will create a complite COW element  */
export const Cow = (cow = {}, events = []) => {
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

  const _getCowStatus = (events = [], date = new Date()) => {
    console.log('events', events)
    
    return ['lactando', 'gestando']
  }

  const eventsSorted = events.sort((a, b) => a.date - b.date)
  const formatedEvents = eventsSorted.map((event) => Event(event))
 /*  const lastEvent = eventsSorted[eventsSorted.length - 1]
  const previusEvent = eventsSorted[eventsSorted.length - 2]
 */
  return {
    upcomingEvents: [],
    events: formatedEvents,
    statuses: _getCowStatus(events),
    lastEvent: {},

    ...details,
  }
}
