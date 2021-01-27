import moment from 'moment'

export const formatEvent = (event = {}, labels = {}) => {
  let nextCheck
  let nextEvent

  switch (event.event) {
    case 'parto':
      nextEvent = 'celo'
      nextCheck = moment(event.date).add(12, 'hours').add(70, 'd')
      break
    case 'celo':
      nextEvent = 'celo'
      nextCheck = moment(event.date).add(12, 'hours').add(21, 'd')
      break
    case 'monta':
      nextEvent = 'gesta'
      nextCheck = moment(event.date).add(12, 'hours').add(80, 'd')
      break
    case 'insem':
      nextEvent = 'gesta'
      nextCheck = moment(event.date).add(12, 'hours').add(80, 'd')
      break
    case 'gestaFail':
      nextEvent = 'celo'
      nextCheck = moment(event.date).add(12, 'hours').add(21, 'd')
      break
    case 'gestaSuccess':
      nextEvent = 'secado'
      nextCheck = moment(event.date).add(12, 'hours').add(140, 'd')
      break
    case 'secado':
      nextEvent = 'parto'
      nextCheck = moment(event.date).add(12, 'hours').add(90, 'd')
    default:
      break
  }

  const eventFormatDate = moment(event.date)
    .add(12, 'hours')
    .format('DD MMMM')
    .slice(0, 6)
  const nextEventFormatDate = nextCheck?.format('DD MMMM').slice(0, 6)
  const eventDate = new Date(event.date)
  const nextEventDate = new Date(nextCheck)

  const formatedEvent = {
    earring: event.earring,
    type: event.event,
    label: labels[event.event],
    date: eventDate,
    formatDate: eventFormatDate,
    nextEvent: {
      type: nextEvent,
      date: nextEventDate,
      label: labels[nextEvent],
      formatDate: nextEventFormatDate
    }
  }
  return formatedEvent
}

export function getToday () {
  const date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  const today = year + '-' + month + '-' + day
  return today
}
