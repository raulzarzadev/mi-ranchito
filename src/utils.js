import moment from 'moment'

export const formatEvent = (event = {}, eventsAvaliables = []) => {
  const labels = eventsAvaliables.reduce((acum, current) => {
    const { label, type } = current
    acum[type] = label
    return acum
  }, {})
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
      break
    default:
      break
  }

  const eventFormatDate = moment(event.date)
    .add(12, 'hours')
    .format('WW / YY')
    .slice(0, 7)
  const nextEventFormatDate = nextCheck?.format('WW / YY').slice(0, 7)
  const eventDate = new Date(event.date)
  const nextEventDate = new Date(nextCheck)

  const formatedEvent = {
    id: event.id,
    earring: event.earring,
    type: event.event,
    label: labels[event.event],
    date: eventDate,
    formatDate: eventFormatDate,
    coments: event.coments,
    nextEvent: {
      type: nextEvent,
      date: nextEventDate,
      label: labels[nextEvent],
      formatDate: nextEventFormatDate,
    },
  }
  return formatedEvent
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
