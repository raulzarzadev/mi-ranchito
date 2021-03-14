import firebaseClient from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

!firebaseClient.apps.length && firebaseClient.initializeApp(firebaseConfig)
// firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)

const firebaizedDate = (date) =>
  firebaseClient.firestore.Timestamp.fromDate(date)

export const loginWithFacebook = async () => {
  const facebookProvider = new firebaseClient.auth.FacebookAuthProvider()

  return await firebaseClient
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      /** @type {firebaseClient.auth.OAuthCredential} */
      const credential = result.credential

      // The signed-in user info.
      const user = result.user

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken
      return {
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          joinedAt: firebaizedDate(new Date()),
        },
        accessToken,
      }
    })
}

export const loginWithGoogleMail = async () => {
  const googleProvider = new firebaseClient.auth.GoogleAuthProvider()
  const res = firebaseClient
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const credential = res.credential
      const { user } = res
      const { accessToken } = credential
      return {
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          joinedAt: firebaizedDate(new Date()),
        },
        accessToken,
      }
    })

  return res
  // googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
}

export const loginWithEmail = async (email, pass) => {
  const result = await firebaseClient
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(({ user }) => {
      return {
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
        },
      }
    })
    .catch((err) => {
      return err
    })
  return result
}

/* export const signupEmail = async (email) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://miranchito.digital/registro',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'https://miranchito.digital',
    },
    android: {
      packageName: 'https://miranchito.digital',
      installApp: true,
      minimumVersion: '12',
    },
    dynamicLinkDomain: 'https://miranchito.digital/registro',
  }
  await firebaseClient
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      localStorage.setItem('emailForSignIn', email)
      // ...
      // window.location.href = '/'
    })
    .catch((err) => {
      return err
    })
} */

export const signupEmail = async (email, pass) => {
  const res = await firebaseClient
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch((err) => {
      return err
    })
  return res
}

export const logout = async () => {
  firebaseClient
    .auth()
    .signOut()
    .then(() => {
      console.log('signout')
    })
    .catch((error) => {
      console.log(error)
    })
}

const db = firebaseClient.firestore()
console.log(db && 'db ok')

/* ---------------- COWS and EARRIGS ---------------- */

export async function deleteCowEvents(earringId) {
  const refs = await db
    .collection('events')
    .where('earringId', '==', earringId)
    .get()
  return await refs.docs.forEach((ref) => {
    db.collection('events')
      .doc(ref.id)
      .delete()
      .then((res) => {
        return { ok: true, type: 'EVT_DELETED' }
      })
      .catch((err) => console.log(err))
    return { ok: true, type: 'COW_EVTS_DELETED' }
  })
}

export async function deleteCow(id) {
  return db
    .collection('cows')
    .doc(id)
    .delete()
    .then((res) => {
      return { ok: true, type: 'COW_DELETED' }
    })
    .catch((err) => console.log(err))
}

export async function getCow(id) {
  return db
    .collection('cows')
    .doc(id)
    .get()
    .then((snapshot) => {
      if (snapshot.data()) {
        return { ok: true, type: 'GET_USER', id, ...snapshot.data() }
      } else {
        return { ok: false, type: 'NOT_EXIST' }
      }
    })
}

export async function newCow(cow) {
  return await db
    .collection('cows')
    .add({
      ...cow,
      createdAt: firebaizedDate(new Date()),
      date: firebaizedDate(new Date(cow.date)),
    })
    .catch((err) => console.log(err))
}

export async function getUserCows(userId = '') {
  return (
    db
      .collection('cows')
      // .where('userId', '==', userId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return {
            id,
            ...data,
          }
        })
      })
      .catch((err) => console.log(err))
  )
}
export function updateCow(cowId, cow) {
  const eventRef = db.collection('cows').doc(cowId)
  return eventRef
    .update({
      ...cow,
      updatedAt: firebaizedDate(new Date()),
      date: firebaizedDate(new Date(cow.date)),
    })
    .then(() => {
      return { ok: true, type: 'COW_UPDATED' }
    })
    .catch((err) => console.log(err))
}

/* ---------------------------------------------------------- */
/* --------------------------EVENTS-------------------------- */
/* ---------------------------------------------------------- */

export const getEventsByCow = (cowId) => {
  return db
    .collection('events')
    .where('earringId', '==', cowId)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
    })
    .catch((err) => console.log(err))
}

export const getEvent = async (id) => {
  return db
    .collection('events')
    .doc(id)
    .get()
    .then((snapshot) => {
      return { id, ...snapshot.data() }
    })
}

export function newEvent(event) {
  return db
    .collection('events')
    .add({
      ...event,
      createdAt: firebaizedDate(new Date()),
      date: firebaizedDate(new Date(event.date)),
    })
    .then(() => {
      return { ok: true, type: 'EVT_CREATED' }
    })
    .catch((err) => console.log(err))
}

export async function getUserEvents(userId = '') {
  return (
    db
      .collection('events')
      // .where('userId', '==', userId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return {
            id,
            ...data,
          }
        })
      })
  )
}

export function updateEvent(eventId, event) {
  const eventRef = db.collection('events').doc(eventId)
  return eventRef
    .update({
      ...event,
      updatedAt: firebaizedDate(new Date()),
      date: firebaizedDate(new Date(event.date)),
    })
    .then(() => {
      return { ok: true, type: 'EVT_UPDATED' }
    })
    .catch((err) => console.log(err))
}

export function deleteEvent(eventId) {
  return db
    .collection('events')
    .doc(eventId)
    .delete()
    .then(() => {
      return { ok: true, type: 'EVT_DELETED' }
    })
    .catch(() => {
      return { ok: false, type: 'DELETE_ERR' }
    })
}

/* ----------------------------------------------- */
/* ------------------- RECORDS ------------------ */
/* ----------------------------------------------- */

export function fbNewRecord(record) {
  return db
    .collection('records')
    .add({
      ...record,
      createdAt: firebaizedDate(new Date()),
      date: firebaizedDate(new Date(record.date)),
    })
    .then(() => {
      return { ok: true, type: 'RECORD_CREATED' }
    })
    .catch((err) => console.log(err))
}

export function fbGetUserRecords(userId) {
  return (
    db
      .collection('records')
      // .where('userId','==',userId)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return { ...doc.data() }
        })
      })
  )
}

export { firebaseClient }

/* ----------------------------------------------- */
/* ------------Functions used just once----------- */
/* ----------------------------------------------- */

const updateDatesSavedToDateType = async () => {
  const events = await db
    .collection('events')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { ...doc.data() }
      })
    })

  console.log(events)
  const updatedEvents = events.map((event) => {
    return { ...event, date: new Date(event.date) }
  })
  console.log(updatedEvents)
}

const updateEarringsToIncludeEarringId = async () => {
  // Se creo est afuncion para acutlaulzar los eventos y que incluyan el id delearrign y no solo el numero del arete
  const aretes = await db
    .collection('cows')
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    })
  // console.log(earr)
  const events = await db
    .collection('events')
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
    )

  events.forEach((event) => {
    const owner = aretes.find((arete) => arete.earring === event.earring)
    const newE = { ...event, earringId: owner.id }
    // updateEvent(newE.id, newE)
  })
}
