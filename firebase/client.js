import firebase from 'firebase'

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

/* ---------------------------------------------------------- */
/* -----------------------FIREBASE UTILS ---------------------- */
/* ---------------------------------------------------------- */

const firebaizedDate = (date) =>
  firebase.firestore.Timestamp.fromDate(new Date(date))

const firebaizeDates = (dates = {}) => {
  let aux = {}
  for (const date in dates) {
    if (Object.hasOwnProperty.call(dates, date)) {
      console.log(dates[date])
      aux = { ...aux, [date]: dates[date] ? firebaizedDate(dates[date]) : null }
    }
  }
  return aux
}
const unfierebazeDate = (date) => console.log(date)
const unfierebazeDates = (dates = {}) => {
  let aux = {}
  for (const date in dates) {
    console.log(dates[date])
    if (dates[date]) {
      aux = {
        ...aux,
        [date]: dates[date] ? unfierebazeDate(dates[date]) : null,
      }
    }
  }
  return aux
}

const normalizeDoc = (doc) => {
  const data = doc.data()
  const { updatedAt, registryDate, createdAt, date } = data
  const dates = unfierebazeDates({
    updatedAt,
    registryDate,
    createdAt,
    date,
  })
  const id = doc.id
  return {
    id,
    ...data,
    ...dates,
  }
}

const normalizeDocs = (docs = []) => docs.map((doc) => normalizeDoc(doc))

const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user
  return { email, name: displayName, image: photoURL, id: user.uid }
}
/* ---------------------------------------------------------- */
/* ----------------------- ACCOUNTS MANAGE---------------------- */
/* ---------------------------------------------------------- */

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const normalizeUser = mapUserFromFirebase(user)
      onChange(normalizeUser)
    } else {
      onChange(null)
    }
  })
}

export const loginWithFacebook = async () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  /* export { firebase } */

  return await firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
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
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  const res = firebase
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
  const result = await firebase
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
    await firebase
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
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch((err) => {
      return err
    })
  return res
}

export const logout = async () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signout')
    })
    .catch((error) => {
      console.log(error)
    })
}

const db = firebase.firestore()
console.log(db && 'db ok')

/* ---------------- COWS and EARRIGS ---------------- */

export async function fb_deleteCowEvents(earringId) {
  const refs = await db.collection('events').where('earringId', '==', earringId)
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

export async function fb_deleteCow(id) {
  return db
    .collection('cows')
    .doc(id)
    .delete()
    .then((res) => {
      return { ok: true, type: 'COW_DELETED' }
    })
    .catch((err) => console.log(err))
}

export async function fb_getCow(id) {
  return db
    .collection('cows')
    .doc(id)
    .get()
    .then((doc) => normalizeDoc(doc))
    .catch((err) => console.log(err))
}

export async function fb_newCow(cow) {
  return await db
    .collection('cows')
    .add({
      ...cow,
      registryDate: firebaizedDate(new Date(cow.registryDate)),
      createdAt: firebaizedDate(new Date()),
    })
    .catch((err) => console.log(err))
}

export async function fb_getUserCows(userId = '') {
  return (
    db
      .collection('cows')
      // .where('userId', '==', userId)
      .get()
      .then(({ docs }) => normalizeDocs(docs))
      .catch((err) => console.log(err))
  )
}
export function fb_updateCow(cowId, cow) {
  console.log(cow)
  const eventRef = db.collection('cows').doc(cowId)
  return eventRef
    .update({
      ...cow,
      updatedAt: firebaizedDate(new Date()),
      registryDate: firebaizedDate(new Date(cow.registryDate)),
    })
    .then(() => {
      return { ok: true, type: 'COW_UPDATED' }
    })
    .catch((err) => console.log(err))
}

/* ---------------------------------------------------------- */
/* --------------------------EVENTS-------------------------- */
/* ---------------------------------------------------------- */

export const fb_getEventsByCow = (cowId) => {
  return db
    .collection('events')
    .where('earringId', '==', cowId)
    .get()
    .then(({ docs }) => normalizeDocs(docs))
    .catch((err) => console.log(err))
}

export const fb_getEvent = async (id) => {
  return db
    .collection('events')
    .doc(id)
    .get()
    .then((doc) => normalizeDoc(doc))
}

export function fb_newEvent(event) {
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

export async function fb_getUserEvents(userId = '') {
  return (
    db
      .collection('events')
      // .where('userId', '==', userId)
      .get()
      .then(({ docs }) => normalizeDocs(docs))
      .catch((err) => console.log(err))
  )
}

export function fb_updateEvent(eventId, event) {
  console.log(event)
  const eventRef = db.collection('events').doc(eventId)
  const { date, updatedAt, createdAt, registryDate } = event
  const dates = firebaizeDates({ date, updatedAt, createdAt, registryDate })
  return eventRef
    .update({
      ...event,
      ...dates,
    })
    .then(() => {
      return { ok: true, type: 'EVT_UPDATED' }
    })
    .catch((err) => console.log(err))
}

export function fb_deleteEvent(eventId) {
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

export function fb_NewRecord(record) {
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

export function fb_GetUserRecords(userId) {
  return (
    db
      .collection('records')
      // .where('userId','==',userId)
      .get()
      .then(({ docs }) => normalizeDocs(docs))
  )
}

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
