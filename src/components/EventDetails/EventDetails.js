import Button from '@cmps/Button'
import ButtonBack from '@cmps/ButtonBack'
import { H3 } from '@cmps/H'
import RemoveEventModal from '@cmps/Modals/RemoveEventModal'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatClientDate, fromNow } from '@raiz/src/utils/Dates'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './styles.module.css'

export default function EventDetails({ event }) {
  console.log('event', event)
  const { variants } = event
  const router = useRouter()
  const { removeEvent } = useEvents()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }
  const handleDeleteEvent = () => {
    removeEvent(event.id)
  }
  return (
    <>
      <div>
        <ButtonBack />
        <div>
          <H3>{`Detalles del Evento`} </H3>
          <div className={s.buttons_box}>
            <Button
              p="2"
              danger
              deleteIcon
              icon
              onClick={handleOpenDeleteModal}
            />
            <Button
              primary
              p="2"
              editIcon
              icon
              onClick={() => router.push(`/dashboard/events/edit/${event.id}`)}
            />
          </div>
          <div>Vaca : {event.earring}</div>
          <div>Evento : {event.label}</div>
          <div>Creado : {fromNow(event.date)}</div>
          <div>Fecha: {formatClientDate(event.date)}</div>
          <div>
            <H3>Variante</H3>
            {variants ? (
              <div>{variants?.map((variant) => variant.label)}</div>
            ) : (
              '-'
            )}
          </div>
          <div>
            <H3>Coments</H3>
            <div>{event?.coments}</div>
          </div>
        </div>
      </div>
      <RemoveEventModal
        open={openDeleteModal}
        handleOpen={handleOpenDeleteModal}
        handleDeleteEvent={handleDeleteEvent}
      />
    </>
  )
}
