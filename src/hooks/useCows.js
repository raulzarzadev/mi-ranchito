import {
  deleteCow,
  getCow,
  deleteCowEvents,
  getUserCows,
  newCow,
  getUserEvents,
  getEventsByCow,
  updateCow,
} from '@raiz/firebaseClient'
import { useAuth } from '../context/AuthContext'
import { formatEventsByEarrings, formatEventsCow } from '../utils'

export default function useCows() {
  const { user } = useAuth()

  const addCow = (cow) => {
    return newCow({ userId: user.id, ...cow })
      .then((res) => {
        return res
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

  const getCows = async () => {
    const cows = await getUserCows(user?.id).then((res) => {
      return res
    })
    const events = await getUserEvents(user?.id).then((res) => {
      return res
    })
    console.log(events)
    return formatEventsByEarrings(cows, events)
  }

  const getCowDetails = async (cowId) => {
    const cow = await getCow(cowId).then((res) => {
      return res
    })
    const events = await getEventsByCow(cowId).then((res) => {
      return res
    })
    console.log(events)
    return formatEventsCow(cow, events)
  }

  const editCow = (cowId, newCow) => {
    return updateCow(cowId, newCow).then((res) => {
      return res
    })
  }

  return { getCowDetails, getCows, addCow, removeCow, editCow }
}
