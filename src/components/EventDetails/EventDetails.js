import Button from '@cmps/Inputs/Button'
import { H2, H3 } from '@cmps/H'
import RemoveEventModal from '@cmps/Modals/RemoveEventModal'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatClientDate, fromNow } from '@raiz/src/utils/Dates'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './styles.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

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
        <div>
          <H2>{`Evento`} </H2>
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
          <div className={s.cow}>
            <span>Vaca : {event.earring} </span>
            <Button
              m="none"
              icon
              p="1"
              onClick={() => router.push(`/dashboard/cows/${event.earringId}`)}
            >
              <ArrowForwardIcon />
            </Button>
          </div>
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
