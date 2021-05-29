import Button from '@cmps/Inputs/Button'
import { H2, H3 } from '@cmps/H'
import RemoveEventModal from '@cmps/Modals/RemoveEventModal'
import useEvents from '@raiz/src/hooks/useEvents'
import { fromNow } from '@raiz/src/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import s from './styles.module.css'

export default function CowEvents({ events = [], cowId = '' }) {
  console.log('events', events)

  const router = useRouter()
  return (
    <div className={s.grid}>
      <div className={s.grid_title}>
        <H2>Todos los Eventos</H2>
        <Button
          addNew
          primary
          p="2"
          my="2"
          onClick={() => router.push(`/dashboard/events/new?cowId=${cowId}`)}
        >
          Evento
        </Button>
      </div>
      <div className={s.grid_titles}>
        <div className={s.title}>Evento</div>
        <div className={s.title}>Fecha</div>
        <div className={s.title}>Variante</div>
        <div className={s.title}>Coments</div>
        {/*  <div className={s.title}>Actions</div> */}
      </div>
      {events.map((event) => (
        <Row key={event.id} event={event} />
      ))}
    </div>
  )
}

const Row = ({ event }) => {
  const { label, id, date, variants, coments } = event

  const { removeEvent } = useEvents()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }
  const handleDeleteEvent = () => {
    removeEvent(event.id)
  }
  const router = useRouter()
  return (
    <div
      className={s.grid_row}
      onClick={() => router.push(`/dashboard/events/${id}`)}
    >
      <div>{label}</div>
      <div>{fromNow(date)}</div>
      <div>
        {variants?.map((variant) => (
          <div key={variant.key}>{variant.label}</div>
        ))}
      </div>
      <div>{coments || '-'}</div>
      {/* <div>
        <Button
          icon
          deleteIcon
          secondary
          onClick={(e) => {
            handleOpenDeleteModal()
          }}
        />
        <Button icon editIcon primary />
      </div> */}
      <RemoveEventModal
        open={openDeleteModal}
        handleOpen={handleOpenDeleteModal}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  )
}
