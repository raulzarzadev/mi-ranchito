import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import Button from '@cmps/Inputs/Button'
import CowEvents from '@cmps/Tables/CowEventsTable'
import RemoveCowModal from '@cmps/Modals/RemoveCowModal/RemoveCowModal'
import { get_sheep } from '@raiz/firebase/sheeps'
import { format } from 'date-fns'
export default function SheepDetails() {
  const router = useRouter()
  const { id } = router.query
  const [details, setDetails] = useState(undefined)
  const [openRemoveCowModal, setOpenRemoveCowModal] = useState(false)
  const handleOpenDeleteModal = () => {
    setOpenRemoveCowModal(!openRemoveCowModal)
  }
  useEffect(() => {
    if (id) {
      get_sheep(id).then(({ res }) => setDetails(res))
    }
  }, [id])

  if (details === undefined) return 'loading ...'

  const { earring, name, registryDate, birth, events } = details
  return (
    <>
      <div>
        <H2>Borrego</H2>
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
              href={`${ROUTES.sheeps}/edit/${id}`}
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
              {birth ? format(birth, 'dd MMM') : '-'}
            </div>
          </div>
          <div>
            <div className={styles.detail_title}>Registro :</div>
            <div className={styles.detail_content}>
              {registryDate ? format(registryDate, 'dd MMM') : '-'}
            </div>
          </div>
        </div>
      </div>
      <CowEvents events={events} cowId={id} />
      <RemoveCowModal
        open={openRemoveCowModal}
        handleOpen={handleOpenDeleteModal}
        cowId={id}
      />
    </>
  )
}
