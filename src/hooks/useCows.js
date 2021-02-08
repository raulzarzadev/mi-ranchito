import { getUserCows, getUserEvents, newCow } from '@raiz/firebaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatEventsByEarring } from '../utils'
import useEvents from './useEvents'

export default function useCows() {
  /*  const [cowsEvents, setCowsEvents] = useState([])
  const [cows, setCows] = useState([])
  const { events } = useEvents()
  console.log(events)
  
  const handleNewCow = async (cow) => {
    await newCow(cow)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    await refetchCows()
  }
  const refetchCows = () => {
    if (user) {
      getUserCows(user?.id)
      .then(setCows)
      .catch((err) => console.log(err))
    }
  }
  
  useEffect(() => {
    refetchCows()
  }, [user])
  
  useEffect(() => {
    const formatedCows = formatEventsByEarring(events, cows)
    setCowsEvents(formatedCows)
  }, [cows])
  
  */
  const { user } = useAuth()
  const [errors, setErrors] = useState(null)
  const [cows, setCows] = useState([])
  const { events } = useEvents()

  const addCow = (cow) => {
    newCow(cow)
      .then((res) => console.log(res))
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

  useEffect(() => {
    setFormatedCows(formatEventsByEarring(events, cows))
  }, [])

  const [formatedCows, setFormatedCows] = useState([])
  // const formatedCows = formatEventsByEarring(events, cows)
  return { errors, cows, formatedCows, addCow, removeCow }
}
