import Text from '@cmps/Inputs/Text'
import { H2 } from '@cmps/Texts/H'
import { formatDate, formatInputDate, formatInputDateFns } from '@raiz/src/utils/Dates'
import { useEffect, useState } from 'react'
import Button from '@cmps/Inputs/Button'
import styles from './styles.module.css'
import ROUTES from '@raiz/constants/ROUTES'
import { create_sheeps, edit_sheep } from '@raiz/firebase/sheeps'
import { useAuth } from '@raiz/src/context/AuthContext'
import { format } from 'date-fns'
/* import { useEffect, useState } from 'react'
import useSheeps from '@raiz/src/hooks/useSheeps'
import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import { useRouter } from 'next/router'
import Text from '@cmps/Inputs/Text'
import { formatInputDate } from '@raiz/src/utils/Dates'
 */
export default function FormSheep({ sheep = undefined, title = '' }) {
  const [actions, setActions] = useState('new')
  const { user } = useAuth()
  useEffect(() => {
    if (sheep) {
      setForm({ ...sheep })
      setActions('edit')
    }
  }, [sheep])

  const [form, setForm] = useState({
    birth: new Date(),
    registryDate: new Date(),
  })

  const [earrings, setEarrings] = useState()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const alreadyExist = earrings?.find(
    (earring) => earring.earring === form.earring
  )

  const handleSubmit = (form) => {
    if (form?.id) {
      edit_sheep(form.id, form)
        .then((res) => console.log(res))
        .catch((err) => console.log('err', err))
    } else {
      create_sheeps(user.id, form)
        .then((res) => console.log(res))
        .catch((err) => console.log('err', err))
    }
  }

  const handleChangeDate = async (e) => {
    const date = e.target.value
    setForm({ ...form, [e.target.name]: date })
  }

  const valid = !!alreadyExist || !form?.earring
  return (
    <div>
      <H2>{title}</H2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
        className={styles.form}
      >
        <div className={styles.item}>
          <Text
            label="Arete"
            placeholder="Numero de arete"
            name="earring"
            value={form?.earring || ''}
            onChange={handleChange}
            autoFocus
            autoComplete="off"
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Nombre"
            value={form?.name || ''}
            placeholder="(opcional)"
            name="name"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Registro"
            type="date"
            name="registryDate"
            value={formatDate(form.registryDate)}
            onChange={handleChangeDate}
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Nacimiento"
            type="date"
            name="birth"
            value={formatDate(form.birth)}
            onChange={handleChangeDate}
          />
        </div>
        {actions === 'edit' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button disabled={!form?.earring} p="2" primary>
                Editar
              </Button>
            </div>
          </div>
        )}
        {actions === 'new' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button disabled={valid} p="2" primary>
                Guardar
              </Button>
            </div>
          </div>
        )}
        {actions === 'saved' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button
                p="2"
                primary
                nextLink
                href={`${ROUTES.newEvent}?SheepId=${form?.id}`}
              >
                Nuevo evento
              </Button>
            </div>
            <div className={styles.item}>
              <Button
                p="2"
                primary
                nextLink
                href={`${ROUTES.newSheep}`}
                onClick={() => setActions('new')}
              >
                Nuevo Vaca
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
