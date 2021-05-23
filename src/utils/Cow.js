import { EVENTS_TYPES_2, VARIANTS } from '@raiz/constants/EVENTS_INFO'

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

  /*  Format event according wit the predeterminated information     */
  const _formatEvent = (event) => {
    const info = EVENTS_TYPES_2.find(({ key }) => key === event.key)
    const variant = VARIANTS[event.key]?.find(
      ({ key }) => key === event.variant
    )
    const { id, key, coments, date } = event
    return {
      id,
      key,
      date,
      coments,
      label: info?.label,
      variants: (variant && [variant]) || null,
    }
    /* 
    return { label, id, date, options, coments } */
  }

  const eventsSorted = events.sort((a, b) => a.date - b.date)
  const formatedEvents = eventsSorted.map((event) => _formatEvent(event))
  const lastEvent = eventsSorted[eventsSorted.length - 1]
  const previusEvent = eventsSorted[eventsSorted.length - 2]

  console.log('formatedEvents', formatedEvents)

  return {
    upcomingEvents: [],
    events: formatedEvents,
    statuses: [],
    lastEvent: {},

    ...details,
  }
}
