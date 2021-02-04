import React from 'react'
import Modal from '@cmps/Modal/Modal'
import moment from 'moment'
import styles from './styles.module.css'

export default function EventModal({ open, handleOpen, event }) {
  const handleEditEvent = () => {
    console.log('edit')
  }
  const handleDeleteEvent = () => {
    console.log('delete')
  }
  const { nextEvent } = event
  return (
    <Modal handleOpen={handleOpen} open={open} title="Detalles del Evento">
      <div>
        <div>Evento: {event.label}</div>
        <div>Fecha: {moment(event.date).format('DD MMM YY')}</div>
        <div>Semana: {moment(event.date).format('WW')}</div>
        <div>Siguiente Evento: {nextEvent.label}</div>
        <div>Fecha: {moment(nextEvent.date).format('DD MMM YY')}</div>
        <div>Semana: {moment(nextEvent.date).format('WW')}</div>
        <div className={styles.actions}>
          <div className="box-1">
            <ModalButton danger label="Eliminar" onClick={handleDeleteEvent} />
          </div>
          <div className="box-1">
            <ModalButton primary label="Editar" onClick={handleEditEvent} />
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