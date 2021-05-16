import React, { useState } from 'react'
import Modal from '@cmps/Modals/Modal/Modal'
import styles from './styles.module.css'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import { Btn1, Btn2 } from '@cmps/Btns'
import ROUTES from '@raiz/constants/ROUTES'

export default function EventModal({ open, handleOpen, event }) {
  const { removeEvent } = useEvents()
  const router = useRouter()
  const handleEditEvent = (id) => {
    router.push(`${ROUTES.editEvent}?eventId=${id}`)
  }
  const handleOpenDeleteModal = () => {
    setOpenDelete(!openDelete)
  }
  const handleRemoveEvent = (id) => {
    removeEvent(id)
  }
  const [openDelete, setOpenDelete] = useState(false)
  const { nextEvent } = event
  return (
    <>
      <Modal handleOpen={handleOpen} open={open} title="Detalles del Evento">
        <div className={styles.modal_container}>
          <div>
            <strong>Evento:</strong> {event?.label}{' '}
            <em>{event?.type || event?.event}</em>
          </div>
          <em>{event.fromNow}</em>
          <div>Fecha: {event.formatDate}</div>
          <div></div>

          <div className={styles.coments}>
            {' '}
            <h5>Comentarios :</h5>
            {event?.coments || 'sin '}
          </div>
          <div>
            <strong>Siguiente Evento:</strong>{' '}
            {nextEvent?.label || <em>{nextEvent?.type}</em>}
          </div>
          <em>{nextEvent?.fromNow}</em>
          <div>Fecha: {nextEvent?.formatDate}</div>
          <div className={styles.actions}>
            <div className="box-1">
              <Btn2 label="Eliminar" onClick={handleOpenDeleteModal} />
            </div>
            <div className="box-1">
              <Btn1 label="Editar" onClick={() => handleEditEvent(event.id)} />
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={openDelete} handleOpen={handleOpenDeleteModal}>
        <div style={{ display: 'block' }}>
          <div>¿ Seguro que desea Eliminar este evento ?</div>
          <div>
            <em>Tambien se eliminaran eventos ligados con este</em>
          </div>
          <div>
            <Btn2
              label="Eliminar"
              onClick={() => handleRemoveEvent(event.id)}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
