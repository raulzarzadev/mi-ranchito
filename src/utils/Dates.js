import moment from 'moment'

export const fromNow = (date, options = {}) => {
  const { showNow = false, sufix = false } = options
  return date
    ? moment(date).fromNow(sufix)
    : showNow
    ? moment().fromNow(sufix)
    : 'no date'
}

export function formatInputDate(date) {
  const format = moment(date).utc(false).format('YYYY-MM-DD')
  return format
}
