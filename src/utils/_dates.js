import moment from 'moment'

export const fromNow = (date) => {
  return date ? moment(date).fromNow() : moment().fromNow()
}


export function formatInputDate(date) {
    const format = moment(date).utc(false).format('YYYY-MM-DD')
    return format
  }