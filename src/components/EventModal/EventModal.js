import React from 'react'
import Modal from '@cmps/Modal/Modal'
import moment from 'moment'
import styles from './styles.module.css'
import { useRouter } from 'next/router'

export default function EventModal({ open, handleOpen, event }) {
  const router = useRouter()
  const handleEditEvent = (id) => {
    router.push(`/event/edit/${id}`)
  }
  const handleDeleteEvent = () => {
    console.log('delete')
  }
  const { nextEvent } = event
  return (
    <Modal handleOpen={handleOpen} open={open} title="Detalles del Evento">
      <div>
        <div>
          <strong>Evento:</strong> {event?.label}{' '}
          <em>{event?.type || event?.event}</em>
        </div>
        <div>Fecha: {moment(event?.date).format('DD MMM YY')}</div>
        <div>Semana: {moment(event?.date).format('WW')}</div>

        <div className={styles.coments}>
          {' '}
          <h5>Detalles :</h5>
          {event?.coments || 'sin detalles'}
        </div>
        <div>
          <strong>Siguiente Evento:</strong> {nextEvent?.label}
          <em>{nextEvent?.type}</em>
        </div>
        <div>Fecha: {moment(nextEvent?.date).format('DD MMM YY')}</div>
        <div>Semana: {moment(nextEvent?.date).format('WW')}</div>
        <div className={styles.actions}>
          <div className="box-1">
            <ModalButton danger label="Eliminar" onClick={handleDeleteEvent} />
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
