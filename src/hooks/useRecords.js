import { fbGetUserRecords, fbNewRecord } from '@raiz/firebaseClient'
import { useAuth } from '../context/AuthContext'

export const useRecords = () => {
  const { user } = useAuth()
  const addRecord = (newRecord) => {
    return fbNewRecord({ userId: user.id, ...newRecord }).then((res) =>
      console.log(res)
    )
  }
  const getRecords = (userId) => {
    return fbGetUserRecords(userId).then((res) => res)
  }
  const editRecord = () => {
    console.log('edit record')
  }
  return { addRecord, editRecord, getRecords }
}
