import {
  deleteCow,
  getCow,
  deleteCowEvents,
  getUserCows,
  newCow,
} from '@raiz/firebaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatEventsByEarring } from '../utils'
import useEvents from './useEvents'

export default function useCows() {
  const { user } = useAuth()
  const { events, addEvent } = useEvents()

  const [errors, setErrors] = useState(null)
  const [cows, setCows] = useState([])

  const addCow = (cow) => {
    newCow({ userId: user.id, ...cow })
      .then((res) => {
        addEvent({
          registryDate: cow.registryDate,
          earring: cow.earring,
          event: 'registration',
        })
        console.log(res)
      })
      .catch((err) => console.log(err))
    getUserCows(user.id).then(setCows).catch(setErrors)
  }

  const removeCow = async (cowId) => {
    await deleteCowEvents(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    await deleteCow(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    await getUserCows(user.id).then(setCows).catch(setErrors)
  }

  const getCowDetails = async (cowId) => {
    const cow = await getCow(cowId).catch((err) => console.log(err))
    const eventsByEarring = await events?.filter(
      (event) => event.earringId === cowId
    )
    return { ...cow, events: eventsByEarring }
  }

  useEffect(() => {
    if (user) {
      getUserCows(user.id).then(setCows).catch(setErrors)
    }
  }, [user])

  // const formatedCows = formatEventsByEarring(events, cows)

  return { errors, cows, addCow, removeCow, getCowDetails }
}
