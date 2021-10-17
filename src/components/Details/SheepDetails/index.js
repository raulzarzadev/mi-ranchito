import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import Button from '@cmps/Inputs/Button'
import { delete_sheep, get_sheep } from '@raiz/firebase/sheeps'
import CardDetails from '../CardDetails'
import DeleteModal from '@cmps/Modals/DeleteModal'
export default function SheepDetails() {
  const router = useRouter()
  const { id } = router.query
  const [details, setDetails] = useState(undefined)
  const [openRemoveModar, setOpenRemoveModar] = useState(false)
  const handleOpenRemoveModal = () => {
    setOpenRemoveModar(!openRemoveModar)
  }
  useEffect(() => {
    if (id) {
      get_sheep(id).then(({ res }) => setDetails(res))
    }
  }, [id])

  const handleDelete = () => {
    delete_sheep(id)
      .then((res) => {
        router.replace(ROUTES.sheeps.index)
      })
      .catch((err) => console.log('err', err))
  }

  if (details === undefined) return 'loading ...'

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
              onClick={handleOpenRemoveModal}
            />
          </div>
          <div className="box-1">
            <Button
              p="2"
              icon
              editIcon
              primary
              nextLink
              href={`${ROUTES.sheeps.edit(id)}`}
            />
          </div>
        </div>
        <CardDetails details={details} />
      </div>
      {/* <CowEvents events={events} cowId={id} /> */}
      <DeleteModal
        open={openRemoveModar}
        handleOpen={handleOpenRemoveModal}
        handleDelete={handleDelete}
      />
    </>
  )
}
