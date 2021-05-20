import { PERIODS } from "@raiz/constants/EVENTS_INFO"

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

  const eventsSorted = events.sort((a, b) => a.date - b.date)
  const lastEvent = eventsSorted[eventsSorted.length - 1]
  const previusEvent = eventsSorted[eventsSorted.length - 2]
  const a = getEventConfig('SERV')
  
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


export function getEventConfig(event) {
  const events = {
    SERV: {type:'SECA', inDays:PERIODS.seca},
    PARTO: { type: 'SERV', inDays: PERIODS.rest_time  },
  }
  const e = events[event]  
  return e
}