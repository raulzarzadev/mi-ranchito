import firebase from 'firebase'
const db = firebase.firestore()

export const get_sheeps_events = () => {
  // return db.collection('sheep-events')
  return { message: 'sheeps_events' }
}
