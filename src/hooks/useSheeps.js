import { useAuth } from '../context/AuthContext'
import {
  fb_getEventsBySheep,
  fb_getSheep,
  fb_getUserSheeps,
  fb_newSheep,
  fb_updateSheep,
} from '@raiz/firebase/sheeps'

export default function useSheeps() {
  const { user } = useAuth()

  const addSheep = async (sheep) => {
    return fb_newSheep({ userId: user.id, active: true, ...sheep })
  }

  const getSheep = async (SheepId) => {
    const Sheep = await fb_getSheep(SheepId)
    const events = await fb_getEventsBySheep(SheepId)
    return Sheep(Sheep, events)
  }

  const getSheeps = async () => {
    return []
    /* 
    const formatedSheeps = []
    try {
      const Sheeps = await fb_getUserSheeps(user?.id)
      for (const Sheep of Sheeps) {
        const SheepEvents = await getSheep(Sheep.id)
        formatedSheeps.push(SheepEvents)
      }
    } catch (error) {
      return console.log('error', error)
    } 
    return formatedSheeps
    */
  }

  const editSheep = async (SheepId, newSheep) => {
    const res = await fb_updateSheep(SheepId, newSheep)
    return res
  }

  const removeSheep = async (SheepId) => {
    return await fb_updateSheep(SheepId, { active: false })
  }

  return { getSheep, getSheeps, addSheep, removeSheep, editSheep }
}
