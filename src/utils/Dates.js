import moment from 'moment'
import {
  addMinutes,
  format as fnsFormat,
  formatDistanceToNowStrict,
} from 'date-fns'
import { es } from 'date-fns/locale'

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale

export const format = (date, formatStr = 'PP') => {
  return fnsFormat(date, formatStr, {
    locale: es, // or global.__localeId__
  })
}
export function formatInputDate(date) {
  const format = moment(date).utc(false).format('YYYY-MM-DD')
  return format
}

export function formatDate(date) {
  const newDate = new Date(date)
  return fnsFormat(
    addMinutes(newDate, newDate.getTimezoneOffset()),
    'yyyy-MM-dd'
  )
}
export const fromNow = (date, options = {}) => {
  const { showNow = false, sufix = false } = options
  return date
    ? moment(date).fromNow(sufix)
    : showNow
    ? moment().fromNow(sufix)
    : 'no date'
}

export const currentAge = (date, options = {}) => {
  const { showNow = false, sufix = false } = options
  return date
    ? formatDistanceToNowStrict(date, { addSuffix: sufix, locale: es })
    : showNow
    ? formatDistanceToNowStrict(new Date(), { addSuffix: sufix, locale: es })
    : 'no date'
}

export const formatClientDate = (date) => {
  const format = moment(date).utc(false).format('DD - MMMM - YY')
  return format
}
