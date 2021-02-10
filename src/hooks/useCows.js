import { getUserCows,  newCow } from '@raiz/firebaseClient'
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
    newCow(cow)
      .then((res) => {
        addEvent()
        console.log(res)})
      .catch((err) => console.log(err))
  }
  const removeCow = (cowId) => {
    console.log('eliminar vaca', cowId)
  }

  useEffect(() => {
    if (user) {
      getUserCows(user.id).then(setCows).catch(setErrors)
    }
  }, [user])

  const formatedCows = formatEventsByEarring(events, cows)
  return { errors, cows: formatedCows, addCow, removeCow }
}
