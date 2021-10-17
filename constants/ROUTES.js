export default {
  /* ---PUBLIC ROUTES--- */
  home: '/',
  signup: '/signup',
  signin: '/signin',
  sources: '/sources',
  /* ---  DASHBARD --- */
  dashboard: '/dashboard',
  configuration: '/dashboard/config',
  news: '/dashboard/news',

  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  //             COWS ROUTES
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  cows: '/dashboard/cows',

  /*  newCow: '/dashboard/cows/new',
  cowDetails: '/dashboard/cows/details',
  editCow: '/dashboard/cows/edit/', */

  /* ---EVENTS--- */
  events: '/dashboard/cows/events',
  newEvent: '/dashboard/cows/events/new',
  upcommingEvents: '/dashboard/cows/events/upcoming',
  editEvent: '/dashboard/cows/events/edit',
  /* ---RECORDS--- */
  records: '/dashboard/cows/records',
  newRecord: '/dashboard/cows/records/new',

  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*, */
  //             SHEEPS ROUTES
  /* .-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'*,.-°'rz */

  sheeps: {
    index: '/sheeps',
    dashboard: function () {
      return `${this.index}/dashboard`
    },
    events: function () {
      return `${this.index}/events`
    },
    new: function () {
      return `${this.index}/new`
    },
    cattle: function () {
      return `${this.index}/cattle`
    },
    edit: function (id) {
      return `${this.index}/edit/${id}`
    },
    details: function (id) {
      return `${this.index}/${id}`
    },
  },
}
