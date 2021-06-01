import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useCows from '@raiz/src/hooks/useCows'
import { H2, H3 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import Button from '@cmps/Inputs/Button'
import { fromNow } from '@raiz/src/utils/Dates'
import CowEvents from '@cmps/Tables/CowEventsTable'
import RemoveCowModal from '@cmps/Modals/RemoveCowModal/RemoveCowModal'
export default function CowDetails() {
  const router = useRouter()
  const { getCow } = useCows()
  const { id } = router.query
  const [details, setDetails] = useState(undefined)
  const [openRemoveCowModal, setOpenRemoveCowModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenRemoveCowModal(!openRemoveCowModal)
  }
  useEffect(() => {
    if (id) {
      getCow(id).then(setDetails)
    }
  }, [id])

  console.log('details', details)
  
  

  if (details === undefined) return 'loading ...'

  const {
    earring,
    name,
    registryDate,
    birth,
    events,
    lastEvent,
    statuses,
  } = details

  return (
    <>
      <div>
        <H2>Vaca</H2>
        <div className={styles.actions}>
          <div className="box-1">
            <Button
              p="2"
              icon
              deleteIcon
              danger
              onClick={handleOpenDeleteModal}
            />
          </div>
          <div className="box-1">
            <Button
              p="2"
              icon
              editIcon
              primary
              nextLink
              href={`${ROUTES.editCow}${id}`}
            />
          </div>
        </div>
        <div className={styles.details_box}>
          <div>
            <div className={styles.detail_title}> Arete No. :</div>
            <div className={styles.detail_content}>{earring}</div>
          </div>
          <div>
            <div className={styles.detail_title}>Nombre :</div>
            <div className={styles.detail_content}>{name || '-'}</div>
          </div>
          <div>
            <div className={styles.detail_title}>Edad :</div>
            <div className={styles.detail_content}>
              {fromNow(birth, { showNow: true, sufix: true })}
            </div>
          </div>
          <div>
            <div className={styles.detail_title}>Registro :</div>
            <div className={styles.detail_content}>
              {fromNow(registryDate) || '-'}
            </div>
          </div>
        </div>
      </div>

      <CowEvents events={events} cowId={id} />
      {/*  <div>Id: {id}</div>
      <div>Arete: {earring}</div>
      <div>Nombre/apodo: {name}</div>
      <div>Edad : {age}</div>
      <div>Registro: {new Date(registryDate).toUTCString()}</div>
      <div className="center">
        <div className="box-1">
          <P3>Status</P3>
          {statuses?.map((status) => (
            <H2 key={status}>{status}</H2>
          ))}
        </div>
      </div> */}
      {/* <div className={styles.button_box}>
        <div className="box-1">
          <Btn1 label="Nuevo Evento" href={`${ROUTES.newEvent}?cowId=${id}`} />
        </div>
      </div> */}
      {/*  <LastEventView lastEvent={lastEvent} />
      <EventTable
        hideEarring
        upcomingEvents
        title={`Historial de ${earring}`}
        events={events}
      /> */}
      <RemoveCowModal
        open={openRemoveCowModal}
        handleOpen={handleOpenDeleteModal}
        cowId={id}
      />
    </>
  )
}
