import { EVENTS_TYPES_2, VARIANTS } from '@raiz/constants/EVENTS_INFO'

export const formatEvent = (event) => {
  const eventDetails = EVENTS_TYPES_2.find(({ key }) => key === event.key)
  console.log('eventDetails', eventDetails)

  return {}
}

export const Event = (event) => {
  const formated = EVENTS_TYPES_2.find(({ key }) => event.key === key)
  const variants = VARIANTS[event.key].find(({ key }) => key === event.variant)

  return { ...formated, ...event, variants: (variants && [variants]) || null }
}
