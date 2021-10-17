import Button from '@cmps/Inputs/Button'
import P from '@cmps/Texts/P/P'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import s from './styles.module.css'

export default function DeleteModal({
  open,
  handleOpen,
  handleDelete = () => {},
  deleteText = 'Elimiar elemento',
}) {
  const [deleteButtonText, setDeleteButtonText] = useState('Eliminar')

  const onDelete = () => {
    setDeleteButtonText('Eliminado')
    setTimeout(() => {
      handleDelete()
      handleOpen()
    }, 800)
  }

  return (
    <Modal open={open} handleOpen={handleOpen} title="Eliminar">
      <div style={{ maxWidth: '200px' }}>
        <P primary>{deleteText}</P>
        <div className={s.buttons_box}>
          <Button p="2" danger onClick={onDelete}>
            {deleteButtonText}
          </Button>
          <Button p="2" onClick={handleOpen}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
