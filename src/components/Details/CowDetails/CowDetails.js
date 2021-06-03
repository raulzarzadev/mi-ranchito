import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useCows from '@raiz/src/hooks/useCows'
import { H2 } from '@cmps/Texts/H'
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

  if (details === undefined) return 'loading ...'

  const { earring, name, registryDate, birth, events } = details

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
      <RemoveCowModal
        open={openRemoveCowModal}
        handleOpen={handleOpenDeleteModal}
        cowId={id}
      />
    </>
  )
}
