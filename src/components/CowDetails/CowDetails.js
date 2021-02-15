import BtnLink from '@cmps/BtnLink/BtnLink'
import BtnModal from '@cmps/BtnModal'
import EventTable from '@cmps/EventTable'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import useCows from '@raiz/src/hooks/useCows'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function CowDetails({ cowId }) {
  const router = useRouter()
  const { getCowDetails, removeCow } = useCows()
  const [cow, setCow] = useState(undefined)
  console.log(cowId)
  useEffect(() => {
    getCowDetails(cowId).then((res) => {
      if (res.ok) {
        setCow(res)
      }
    })
  }, [cowId])

  const handleDelete = async (id) => {
    await removeCow(id)
    router.back()
  }
  const [deleteModal, setDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  if (cow === undefined) return '...loading'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <BtnLink
          label="Nuevo Evento"
          href={`/dashboard-cows/newEvent?earring=${cow?.earring}&earringId=${cow?.id}`}
        />
        <BtnLink
          label="Nuevo Registro"
          href={`/dashboard-cows/newRecord?earring=${cow?.earring}&earringId=${cow?.id}`}
        />
        <BtnModal label="Eliminar" danger onClick={handleOpenDeleteModal} />
      </div>
      <div>Id: {cow?.id}</div>
      <div>Arete: {cow?.earring}</div>
      <div>Nombre/apodo: {cow?.name}</div>
      <EventTable
        upcomingEvents
        title={`Eventos de ${cow?.earring}`}
        events={cow?.events}
      />
      <Modal open={deleteModal} handleOpen={handleOpenDeleteModal}>
        <div style={{ maxWidth: '200px' }}>
          <P primary>
            Eliminaras esta vaca y todos los eventos relacionados con esta.
          </P>
          <P strong> ¿Estas seguro?</P>
          <div className={styles.modal_actions}>
            <BtnModal
              danger
              label="Eliminar"
              onClick={() => handleDelete(cow?.id)}
            />
            <BtnModal label="Cancelar" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
