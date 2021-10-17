import firebase from 'firebase'
import {
  datesToFirebaseFromat,
  formatRespose,
  normalizeDoc,
  normalizeDocs,
} from '../helpers'
const db = firebase.firestore()
const RESPONSES = {
  create: {
    success: 'CREATE_SUCCESS',
    error: 'CREATE_ERROR',
  },
  update: {
    success: 'UPDATED_SUCCESS',
    error: 'UPDATED_ERROR',
  },
  get: {
    success: 'GET_RESOURCE_SUCCESS',
    error: 'GET_RESOURCE_ERROR',
  },
  delete: {
    success: 'RESOURCE_DELETED',
    error: 'RESOURCE_DELETED_ERROR',
  },
}
export const get_sheep = async (sheepId) => {
  return await db
    .collection('sheeps')
    .doc(sheepId)
    .get()
    .then((res) =>
      formatRespose(true, RESPONSES.get.success, normalizeDoc(res))
    )
    .catch((err) => formatRespose(false, RESPONSES.get.error, err))
}

export const get_sheeps = async (userId) => {
  return await db
    .collection('sheeps')
    .where('userId', '==', userId)
    .get()
    .then((res) =>
      formatRespose(true, RESPONSES.get.success, normalizeDocs(res?.docs))
    )
    .catch((err) => formatRespose(false, RESPONSES.get.error, err))
}

export const create_sheeps = async (userId, sheep) => {
  return await db
    .collection('sheeps')
    .add({
      userId,
      ...sheep,
      ...datesToFirebaseFromat(sheep),
    })
    .then((res) => formatRespose(true, RESPONSES.create.success, res))
    .catch((err) => formatRespose(false, RESPONSES.create.error, err))
}

export async function delete_sheep(id) {
  return db
    .collection('sheeps')
    .doc(id)
    .delete()
    .then((res) => formatRespose(true, RESPONSES.delete.success, res))
    .catch((err) => console.log(err))
}

export const edit_sheep = async (sheepId, sheep) => {
  return await db
    .collection('sheeps')
    .doc(sheepId)
    .update({
      ...sheep,
      ...datesToFirebaseFromat(sheep),
    })
    .then((res) => formatRespose(true, RESPONSES.update.success, res))
    .catch((err) => formatRespose(false, RESPONSES.update.error, err))
}

export const fb_getEventsBySheep = () => {
  return { res: 'fb_getEventsBySheep' }
}
