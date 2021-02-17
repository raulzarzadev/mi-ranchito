import EventTable from '@cmps/EventTable'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { Btn1, Btn2 } from '@cmps/Btns'
import { deleteCow, getCow, getEventsByCow } from '@raiz/firebaseClient'
import { useRouter } from 'next/router'
import { formatEventsCow } from '@raiz/src/utils'

export default function CowDetails() {
  const router = useRouter()
  const { id } = router.query
  const [cowData, setCowData] = useState()
  const [eventsData, setEventsData] = useState()
  const [details, setDetails] = useState(undefined)

  const getCowDetails = () => {
    getCow(id).then((res) => setCowData(res))
    getEventsByCow(id).then((res) => setEventsData(res))
  }

  useEffect(() => {
    if ((cowData, eventsData)) {
      setDetails(formatEventsCow(cowData, eventsData))
    }
  }, [cowData, eventsData, id])

  console.log(details)

  useEffect(() => {
    if (id) {
      getCowDetails(id)
    }
  }, [id])

  const [deleteModal, setDeleteModal] = useState()
  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  const handleDelete = (id) => {
    deleteCow(id)
  }

  if (details === undefined) return 'loading ...'
  const { earring, name, registryDate, age, events } = details
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
