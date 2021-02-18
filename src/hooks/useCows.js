import {
  deleteCow,
  getCow,
  deleteCowEvents,
  getUserCows,
  newCow,
  getUserEvents,
} from '@raiz/firebaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
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
  }

  const removeCow = async (cowId) => {
    await deleteCowEvents(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    await deleteCow(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const getCowDetails = async (cowId) => {
    const cow = await getCow(cowId).catch((err) => console.log(err))
    const eventsByEarring = await events?.filter(
      (event) => event.earringId === cowId
    )
    return { ...cow, events: eventsByEarring }
  }
  console.log(user)
  const getCows = async () => {
    const cows = await getUserCows(user?.id).then((res) => console.log(res))
    const events = await getUserEvents(user?.id).then((res) => console.log(res))
    console.log({ events, cows })
  }

  return { errors, getCows, addCow, removeCow, getCowDetails }
}
