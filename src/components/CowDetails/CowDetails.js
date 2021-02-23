import EventTable from '@cmps/EventTable'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { Btn1, Btn2 } from '@cmps/Btns'
import { deleteCow } from '@raiz/firebaseClient'
import { useRouter } from 'next/router'
import useCows from '@raiz/src/hooks/useCows'

export default function CowDetails() {
  const router = useRouter()
  const { getCowDetails } = useCows()
  const { id } = router.query
  const [details, setDetails] = useState(undefined)

  useEffect(() => {
    if (id) {
      getCowDetails(id).then((res) => setDetails(res))
    }
  }, [])

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
      <div className={styles.button_box}>
        <div className="box-1">
          <Btn2 label="Eliminar" onClick={handleOpenDeleteModal} />
        </div>
        <div className="box-1">
          <Btn1
            label="Nuevo Evento"
            href={`/dashboard-cows/newEvent?earringId=${id}`}
          />
        </div>
        <div className="box-1">
          <Btn1 label="Editar" href={`/dashboard-cows/cows/edit/${id}`} />
        </div>
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
