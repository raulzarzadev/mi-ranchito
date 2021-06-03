import Button from '@cmps/Inputs/Button'
import { H2, H3 } from '@cmps/Texts/H'
import RemoveEventModal from '@cmps/Modals/RemoveEventModal'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatClientDate, fromNow } from '@raiz/src/utils/Dates'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './styles.module.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

export default function EventDetails({ event }) {
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
            <span>
              <H2>Arete: </H2>
              {event.earring} <em>{event.name}</em>
            </span>
            <Button
              m="none"
              icon
              p="2"
              secondary
              onClick={() => router.push(`/dashboard/cows/${event.earringId}`)}
            >
              Ver <ArrowForwardIcon />
            </Button>
          </div>
          <div className={s.info}>
            <div>
              <H2>Evento:</H2> {event.label}
            </div>
            <div>
              <H2>Fecha:</H2>
              <div>{formatClientDate(event.date)}</div>
              <em>{fromNow(event.date)}</em>
            </div>
            <div>
              <H2>Variante</H2>
              {variants ? (
                <div>{variants?.map((variant) => variant.label)}</div>
              ) : (
                '-'
              )}
            </div>
            <div>
              <H2>Coments</H2>
              <div>{event?.coments}</div>
            </div>
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
