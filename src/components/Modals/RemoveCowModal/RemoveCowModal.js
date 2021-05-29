import Button from '@cmps/Inputs/Button'
import P from '@cmps/P/P'
import useCows from '@raiz/src/hooks/useCows'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import s from './styles.module.css'

export default function RemoveCowModal({ open, handleOpen, cowId }) {
  const [deleteText, setDeleteText] = useState('Eliminar')
  const router = useRouter()
  const { removeCow } = useCows()

  const handleDelete = () => {
    removeCow(cowId).then((res) => {
      if (res.type === 'COW_UPDATED') {
        setDeleteText('Vaca eliminada')
        setTimeout(() => {
          router.back()
        }, 500)
      }
      console.log('res', res)
    })
  }

  return (
    <Modal open={open} handleOpen={handleOpen} title="Eliminar Vaca">
      <div style={{ maxWidth: '200px' }}>
        <P primary>
          {`Eliminaras esta vaca de la lista. 
          
          Pero se conservaran estadisticas y
          eventos relacionadas
          `}
        </P>
        <div className={s.buttons_box}>
          <Button p="2" danger onClick={() => handleDelete()}>
            {deleteText}
          </Button>
          <Button p="2" onClick={handleOpen}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
