import { useState } from 'react'
import moment from 'moment'
import styles from './styles.module.css'
import useCows from '@raiz/src/hooks/useCows'
import { getToday } from '@raiz/src/utils'

export default function NewEarring() {
  const { addCow, cows } = useCows()
  const today = moment().format('YYYY-MM-DD')
  const [newEarring, setNewEarring] = useState({
    birth: today,
    registryDate: getToday(),
  })

  const handleChange = (e) => {
    e.preventDefault()
    setNewEarring({ ...newEarring, [e.target.name]: e.target.value })
    setLabelButton('Guardar')
  }

  const existedEarring = cows.map((earring) => earring.earring)
  const alreadyExist = existedEarring.includes(newEarring.earring)
  const handleSubmit = () => {
    addCow(newEarring)
  }
  const [labelButton, setLabelButton] = useState('Guardar')

  const valid = alreadyExist || !newEarring?.earring
  console.log(newEarring)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div>
        <div>
          <div className={styles.item}>
            <span>
              No. de Arete:
              <input
                style={{ width: '150px' }}
                type="text"
                placeholder="Arete No."
                name="earring"
                value={newEarring?.earring || ''}
                onChange={handleChange}
              ></input>
            </span>
            <div>
              <em>{alreadyExist && 'Este arete ya está registrado'}</em>
            </div>
          </div>
          <div className={styles.item}>
            <span>
              Nombre:{' '}
              <input
                style={{ width: '150px' }}
                value={newEarring?.name || ''}
                type="text"
                placeholder="Nombre (opcional)"
                name="name"
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <span>
              Fecha de Registro:
              <input
                style={{ width: '150px' }}
                type="date"
                placeholder="Fecha de Nacimiento"
                name="registryDate"
                value={newEarring.birth}
                onChange={handleChange}
              ></input>
            </span>
          </div>
          <div className={styles.item}>
            <button type="submit" disabled={valid}>
              {labelButton}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
