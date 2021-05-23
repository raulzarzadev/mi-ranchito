import {
  fb_deleteCow,
  fb_getCow,
  fb_deleteCowEvents,
  fb_getUserCows,
  fb_newCow,
  fb_updateCow,
  fb_getEventsByCow,
} from '@raiz/firebase/client'
import { useAuth } from '../context/AuthContext'
import { Cow } from '../utils/Cow'

export default function useCows() {
  const { user } = useAuth()

  const addCow = async (cow) => {
    try {
      const res = await fb_newCow({ userId: user.id, ...cow })
      return res
    } catch (err) {
      return console.log(err)
    }
  }

  const getCow = async (cowId) => {
    const cow = await fb_getCow(cowId)
    const events = await fb_getEventsByCow(cowId)
    console.log('events', events)

    return Cow(cow, events)
  }

  const getCows = async () => {
    const formatedCows = []
    try {
      const cows = await fb_getUserCows(user?.id)
      for (const cow of cows) {
        const cowEvents = await getCow(cow.id)

        formatedCows.push(cowEvents)
      }
    } catch (error) {
      return console.log('error', error)
    }
    return formatedCows
  }

  const editCow = async (cowId, newCow) => {
    const res = await fb_updateCow(cowId, newCow)
    return res
  }

  const removeCow = async (cowId) => {
    // TODO solo colocar hide
    console.log('removimng cowId', cowId)

    return await fb_updateCow(cowId, { isHidden: true })
  }

  return { getCow, getCows, addCow, removeCow, editCow }
}
