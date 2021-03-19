import {
  fb_deleteCow,
  fb_getCow,
  fb_deleteCowEvents,
  fb_getUserCows,
  fb_newCow,
  fb_updateCow,
  fb_getUserEvents,
  fb_getEventsByCow,
} from '@raiz/firebase/client'
import { useAuth } from '../context/AuthContext'
import { formatEventsByEarrings, formatEventsCow } from '../utils'

export default function useCows() {
  const { user } = useAuth()

  const addCow = (cow) => {
    return fb_newCow({ userId: user.id, ...cow })
      .then((res) => {
        return res
      })
      .catch((err) => console.log(err))
  }

  const removeCow = async (cowId) => {
    // TODO solo colocar hide
    await fb_deleteCowEvents(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    await fb_deleteCow(cowId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const getCows = async () => {
    const cows = await fb_getUserCows(user?.id).then((res) => {
      return res
    })
    const events = await fb_getUserEvents(user?.id).then((res) => {
      return res
    })

    return formatEventsByEarrings(cows, events)
  }

  const getCowDetails = async (cowId) => {
    const cow = await fb_getCow(cowId)
    const events = await fb_getEventsByCow(cowId)
    console.log(cow, events, cowId)
    return formatEventsCow(cow, events)
  }

  const getCow = (cowId) => {
    return fb_getCow(cowId)
  }

  const editCow = (cowId, newCow) => {
    return fb_updateCow(cowId, newCow).then((res) => {
      return res
    })
  }

  return { getCow, getCowDetails, getCows, addCow, removeCow, editCow }
}
