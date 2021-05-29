import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import useCows from '@raiz/src/hooks/useCows'
import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import { useRouter } from 'next/router'
import Text from '@cmps/Inputs/Text'
import Date from '@cmps/Inputs/Date'
import Button from '@cmps/Inputs/Button'

export default function NewEarring({ cow = undefined, title = '' }) {
  const router = useRouter()
  const [actions, setActions] = useState('new')
  const { addCow, getCows, editCow } = useCows()

  useEffect(() => {
    if (cow) {
      setForm({
        earring: cow.earring,
        name: cow?.name || null,
        registryDate: cow.registryDate,
      })
      setActions('edit')
    }
  }, [cow])

  const [form, setForm] = useState({})
  const [earrings, setEarrings] = useState()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])

  const alreadyExist = earrings?.find(
    (earring) => earring.earring === form.earring
  )

  const handleSubmit = () => {
    console.log('form', form)
    if (cow) {
      editCow(cow.id, form).then((res) => {
        setActions('saved')
        setTimeout(() => {
          router.back()
        }, 500)
      })
    } else {
      addCow(form).then((res) => {
        setActions('saved')
        setForm({ id: res?.id })
      })
    }
  }

  const handleChangeDate = (e) => {
    const date = new Date(e.target.value || form.date).toISOString()
    setForm({ ...form, [e.target.name]: date })
  }

  const valid = !!alreadyExist || !form?.earring

  return (
    <div>
      <H2>{title}</H2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
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
            value={form.registryDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Nacimiento"
            type="date"
            name="birth"
            value={form.birth}
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
                href={`${ROUTES.newEvent}?cowId=${form?.id}`}
              >
                Nuevo evento
              </Button>
            </div>
            <div className={styles.item}>
              <Button
                p="2"
                primary
                nextLink
                href={`${ROUTES.newCow}`}
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
