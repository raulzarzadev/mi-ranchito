import EventTable from '@cmps/EventTable'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { Btn1, Btn2 } from '@cmps/Btns'
import { useRouter } from 'next/router'
import useCows from '@raiz/src/hooks/useCows'
import LastEventView from '@cmps/LastEventView'
import { H2 } from '@cmps/H'
import { P3 } from '@cmps/P'
import ROUTES from '@raiz/constants/ROUTES'

export default function CowDetails() {
  const router = useRouter()
  const { getCowDetails, removeCow } = useCows()
  const { id } = router.query
  const [details, setDetails] = useState(undefined)

  useEffect(() => {
    if (id) {
      getCowDetails(id)
        .then((res) => setDetails(res))
        .catch((err) => console.log(err))
    }
  }, [id])
  const [deleteModal, setDeleteModal] = useState()

  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = (id) => {
    removeCow(id)
  }

  if (details === undefined) return 'loading ...'

  const {
    earring,
    name,
    registryDate,
    age,
    events,
    lastEvent,
    statuses,
  } = details
  return (
    <>
      <div>Id: {id}</div>
      <div>Arete: {earring}</div>
      <div>Nombre/apodo: {name}</div>
      <div>Edad : {age}</div>
      <div>Registro: {registryDate}</div>
      <div className="center">
        <div className="box-1">
          <P3>Status</P3>
          {statuses?.map((status) => (
            <H2 key={status}>{status}</H2>
          ))}
        </div>
      </div>
      <div className={styles.button_box}>
        <div className="box-1">
          <Btn2 label="Eliminar" onClick={handleOpenDeleteModal} />
        </div>
        <div className="box-1">
          <Btn1 label="Nuevo Evento" href={`${ROUTES.newEvent}?cowId=${id}`} />
        </div>
        <div className="box-1">
          <Btn1 label="Editar" href={`${ROUTES.editCow}${id}`} />
        </div>
      </div>
      <LastEventView lastEvent={lastEvent} />
      <EventTable
        hideEarring
        upcomingEvents
        title={`Historial de ${earring}`}
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
