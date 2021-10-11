import firebase from 'firebase'

export const normalizeDoc = (doc) => {
  const data = doc.data()

  if (!doc.exists) return {} // The document  not exist

  const { updatedAt, registryDate, createdAt, date, birth } = data
  const dates = unfierebazeDates({
    updatedAt,
    registryDate,
    createdAt,
    birth,
    date,
  })

  const id = doc.id
  return {
    id,
    ...data,
    ...dates,
  }
}

export const normalizeDocs = (docs = []) => docs.map((doc) => normalizeDoc(doc))

export const mapUserFromFirebase = (user) => {
  const { email, displayName, photoURL } = user
  return { email, name: displayName, image: photoURL, id: user.uid }
}

export const unfierebazeDate = (date) => (date ? date?.toMillis() : null)
export const unfierebazeDates = (dates = {}) => {
  let aux = {}
  for (const date in dates) {
    if (dates[date]) {
      aux = {
        ...aux,
        [date]: dates[date] ? unfierebazeDate(dates[date]) : null,
      }
    }
  }
  return aux
}
/* FROM CLIENT TO FIREBASE */

export const dateToFirebaseFormat = (date) =>
  firebase.firestore.Timestamp.fromDate(new Date(date)) || null

export const datesToFirebaseFromat = ({
  birth,
  registryDate,
  createdAt,
  date,
  updatedAt,
}) => {
  const foramtedDates = {}
  if (birth) foramtedDates.birth = dateToFirebaseFormat(birth)
  if (date) foramtedDates.date = dateToFirebaseFormat(date)
  if (createdAt) foramtedDates.createdAt = dateToFirebaseFormat(createdAt)
  if (updatedAt) foramtedDates.updatedAt = dateToFirebaseFormat(updatedAt)
  if (registryDate)
    foramtedDates.registryDate = dateToFirebaseFormat(registryDate)
  return foramtedDates
}
