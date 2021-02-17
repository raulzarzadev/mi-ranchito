import EventTable from '@cmps/EventTable'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { Btn1, Btn2 } from '@cmps/Btns'
import { deleteCow, getCow, getEventsByCow } from '@raiz/firebaseClient'
import { formatEventsCow } from '@raiz/src/utils'
import { useRouter } from 'next/router'

export default function CowDetails() {
  const router = useRouter()
  const [cowId, setCowId] = useState(null)

  useEffect(() => {
    setCowId(router?.query?.id)
  }, [router])

  console.log(cowId)
  console.log(router)

  const [cow, setCow] = useState(undefined)
  const [events, setEvents] = useState(undefined)

  useEffect(() => {
    if (cowId) {
      getCow(cowId).then((res) => setCow(res))
      getEventsByCow(cowId).then((res) => setEvents(res))
    }
  }, [cowId])

  const [formatedCows, setFormatedCows] = useState(undefined)

  useEffect(() => {
    if (cow && events) {
      setFormatedCows(formatEventsCow(cow, events))
    }
  }, [cowId, cow, events])
  console.log(events)
  return (
    <>
      {formatedCows ? (
        <CowInfo cow={formatedCows} deleteCow={deleteCow} />
      ) : (
        'Loading ...'
      )}
    </>
  )
}

const CowInfo = ({ cow = {}, deleteCow }) => {
  const { earring, name, events, age, id, registryDate } = cow
  const [deleteModal, setDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  const handleDelete = (id) => {
    deleteCow(id)
  }
  return (
    <>
      <div>Id: {id}</div>
      <div>Arete: {earring}</div>
      <div>Nombre/apodo: {name}</div>
      <div>Edad : {age}</div>
      <div>Registro: {registryDate}</div>
      <div style={{ padding: '8px', margin: '8px' }}>
        <Btn2 label="Eliminar" onClick={handleOpenDeleteModal} />
        <Btn1
          label="Nuevo Evento"
          href={`/dashboard-cows/newEvent?cowId=${id}`}
        />
      </div>
      <EventTable
        upcomingEvents
        title={`Eventos de ${earring}`}
        events={events}
      />
      <Modal open={deleteModal} handleOpen={handleOpenDeleteModal}>
        <div style={{ maxWidth: '200px' }}>
          <P primary>
            Eliminaras esta vaca y todos los eventos relacionados con esta.
          </P>
          <P strong>¿Estas seguro?</P>
          <div className={styles.modal_actions}>
            <Btn2 label="Eliminar" onClick={() => handleDelete(id)} />
            <Btn1 label="Cancelar" />
          </div>
        </div>
      </Modal>
    </>
  )
}
