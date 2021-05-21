import Button from '@cmps/Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import s from './styles.module.css'

export default function RemoveEventModal({
  open,
  handleOpen,
  handleDeleteEvent,
}) {
  const [textDelete, setTextDelete] = useState('Eliminar')
  const router = useRouter()
  return (
    <Modal open={open} handleOpen={handleOpen} title="Elimar Event">
      <div className={s.removeeventmodal}>
        {`Seguro que desea elimiar este evento`}
        <div className={s.buttons_box}>
          <Button
            danger
            p="2"
            onClick={() => {
              setTextDelete('Evento eliminado')
              handleDeleteEvent()
              setTimeout(() => {
                router.back()
              }, 500)
            }}
          >
            {textDelete}
          </Button>
          <Button primary p="2" onClick={handleOpen}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
