import { fb_GetUserRecords, fb_NewRecord } from '@raiz/firebase/client'
import { useAuth } from '../context/AuthContext'

export const useRecords = () => {
  const { user } = useAuth()
  const addRecord = (newRecord) => {
    return fb_NewRecord({ userId: user.id, ...newRecord }).then((res) =>
      console.log(res)
    )
  }
  const getRecords = (userId) => {
    return fb_GetUserRecords(userId).then((res) => res)
  }
  const editRecord = () => {
    console.log('edit record')
  }
  return { addRecord, editRecord, getRecords }
}
