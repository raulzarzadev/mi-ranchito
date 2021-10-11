import firebase from 'firebase'
const db = firebase.firestore()

export const fb_getSheep = () => {
  return { res: 'fb_getSheep' }
}

export const fb_getUserSheeps = () => {
  return { res: 'fb_getUserSheeps' }
}

export const fb_newSheep = (sheep) => {
  return { res: 'fb_newSheep', data: sheep }
}

export const fb_updateSheep = () => {
  return { res: 'fb_updateSheep' }
}

export const fb_getEventsBySheep = () => {
  return { res: 'fb_getEventsBySheep' }
}
