import React, { useState } from 'react'
import Modal from '@cmps/Modal/Modal'
import moment from 'moment'
import styles from './styles.module.css'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'

export default function EventModal({ open, handleOpen, event }) {
  const { removeEvent } = useEvents()
  const router = useRouter()
  const handleEditEvent = (id) => {
    router.push(`/dashboard-cows/events/edit/${id}`)
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
          <div>Fecha: {moment(event?.date).format('DD MMM YY')}</div>
          <div>
            {' '}
            <em>{event.fromNow}</em>
          </div>

          <div className={styles.coments}>
            {' '}
            <h5>Detalles :</h5>
            {event?.coments || 'sin detalles'}
          </div>
          <div>
            <strong>Siguiente Evento:</strong>{' '}
            {nextEvent?.label || <em>{nextEvent?.type}</em>}
          </div>
          <div>Fecha: {moment(nextEvent?.date).format('DD MMM YY')}</div>
          <div>Dentro de: {moment(nextEvent?.date).fromNow(true)}</div>
          <div className={styles.actions}>
            <div className="box-1">
              <ModalButton
                danger
                label="Eliminar"
                onClick={handleOpenDeleteModal}
              />
            </div>
            <div className="box-1">
              <ModalButton
                primary
                label="Editar"
                onClick={() => handleEditEvent(event.id)}
              />
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
            <ModalButton
              danger
              label="Eliminar"
              onClick={() => handleRemoveEvent(event.id)}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

function ModalButton({ onClick, label, primary, secondary, danger, success }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`
      ${styles.btn} 
      ${styles.btn_primary}
      ${primary && styles.btn_primary}
      ${secondary && styles.btn_secondary}
      ${danger && styles.btn_danger}
      ${success && styles.btn_success}
    `}
    >
      {label}
    </button>
  )
}
